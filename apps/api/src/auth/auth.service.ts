import { ConflictException, InternalServerErrorException, Injectable, NotFoundException, UnauthorizedException, Response } from '@nestjs/common';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';
import { Prisma } from '@prisma/client';
import { PasswordService } from './password.service';
import { RegisterDto } from './dto/register.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { UtilisateurPublic } from '../utilisateurs/utilisateur.types';
import { TokenService } from './token/token.service';
import { TokenUpdateData } from "./token/types/token.types"





@Injectable()
export class AuthService {
    constructor(
        private readonly utilisateurService: UtilisateursService,
        private readonly password: PasswordService,

        private readonly tokenService: TokenService,

    ) { }

    async updateRefreshTokenHash(tokenUpdateData: TokenUpdateData): Promise<void> {
        try {
            await this.utilisateurService.setRefreshToken(
                { idUtilisateur: tokenUpdateData.userId }
                , tokenUpdateData.hashRefreshToken
            );
        } catch (error) {
            throw new InternalServerErrorException(error, "Refresh Token error");
        }
    }

    async signIn(email: Prisma.UtilisateurWhereUniqueInput, pass: string): Promise<{ access_token: string, access_token_exp: Date, refresh_token: string, refresh_token_exp: Date }> {
        const user = await this.utilisateurService.findUtilisateurAvecHashParEmail(email);

        if (!user) {

            throw new UnauthorizedException();

        }
        if (!user?.actif) {
            throw new UnauthorizedException();
        }

        const userHashedPassword = user?.passwordHash;

        if (!await this.password.verifyPassword(userHashedPassword, pass)) {

            throw new UnauthorizedException();
        }
        const payload = {
            sub: user.idUtilisateur,
            role: user.role
        };

        const { accessToken, refreshToken } = await this.tokenService.generateTokens(payload);
        const hashRefreshToken = this.tokenService.hashRefreshToken(refreshToken);
        const { expDateAccessToken, expDateRefreshToken } = this.tokenService.decodeAndExtractExpiryDates({ accessToken, refreshToken });
        const userId = user.idUtilisateur;
        await this.updateRefreshTokenHash({ userId, hashRefreshToken });





        return {
            access_token: accessToken,
            access_token_exp: expDateAccessToken,
            refresh_token: refreshToken,
            refresh_token_exp: expDateRefreshToken

        };

    }

    async register(dto: RegisterDto): Promise<{ access_token: string; }> {


        try {
            const user = await this.utilisateurService.createUtilisateur(dto);
            return this.signIn({ email: user.email }, dto.password)
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
                throw new ConflictException("Invalid email or phone number.")
            }
            throw error;
        }


    }

    async getUtilisateurProfile(id: number): Promise<UtilisateurPublic | null> {

        const user = await this.utilisateurService.utilisateur({ idUtilisateur: id });

        if (!user) {
            throw new NotFoundException('User not found.');
        }

        return user;

    }



}
