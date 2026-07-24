import { ConflictException, HttpException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';
import { $Enums, Prisma } from '@prisma/client';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { UtilisateurPublic } from '../utilisateurs/utilisateur.types';
import { JWT_REFRESH_SERVICE } from './auth.constants';
import { createHash } from 'crypto';
import e from 'express';
import { response } from 'express';
import { access } from 'fs';






type Payload = {
    sub: number,
    role: $Enums.RoleUtilisateur
}

type TokenPayload = Payload & {
    iat: number,
    exp: number
}

type Tokens = {
    accessToken: string,
    refreshToken: string
}

type TokenExpiryDatesInS = {
    refreshTokenPayload: TokenPayload,
    accessTokenPayload: TokenPayload

}

type TokenExpiryDatesInMs = {
    expDateRefreshToken: Date,
    expDateAccessToken: Date

}

type TokenUpdateData = {
    userId: number,
    hashRefreshToken: string
}



@Injectable()
export class AuthService {
    constructor(
        private readonly utilisateurService: UtilisateursService,
        private readonly password: PasswordService,
        private readonly jwtService: JwtService,
        @Inject(JWT_REFRESH_SERVICE) private readonly jwtRefreshService: JwtService
    ) { }

    async generateTokens(payload: Payload): Promise<Tokens> {
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtRefreshService.signAsync(payload);
        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    }

    hashRefreshToken(refreshToken: string): string {
        const hashRefreshToken = createHash("sha256").update(refreshToken).digest("hex");
        return hashRefreshToken
    }

    decodeTokens(accessToken: string, refreshToken: string): { accessTokenPayload: TokenPayload, refreshTokenPayload: TokenPayload } {
        const accessTokenPayload = this.jwtService.decode<TokenPayload>(accessToken);
        const refreshTokenPayload = this.jwtService.decode<TokenPayload>(refreshToken);
        return {
            accessTokenPayload: accessTokenPayload,
            refreshTokenPayload: refreshTokenPayload
        }
    }

    extractExpiryDates(tokensPayload: TokenExpiryDatesInS): TokenExpiryDatesInMs {
        const expDateAccessToken = new Date(tokensPayload.accessTokenPayload.exp * 1000);
        const expDateRefreshToken = new Date(tokensPayload.refreshTokenPayload.exp * 1000);


        return {
            expDateRefreshToken: expDateRefreshToken,
            expDateAccessToken: expDateAccessToken
        }
    }

    decodeAndExtractExpiryDates(tokens: Tokens): { expDateRefreshToken: Date, expDateAccessToken: Date } {



        const { accessTokenPayload, refreshTokenPayload } = this.decodeTokens(tokens.accessToken, tokens.refreshToken);

        const { expDateRefreshToken, expDateAccessToken } = this.extractExpiryDates({ accessTokenPayload, refreshTokenPayload })
        return {
            expDateAccessToken: expDateAccessToken,
            expDateRefreshToken: expDateRefreshToken
        }
    }

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

        const { accessToken, refreshToken } = await this.generateTokens(payload);
        const hashRefreshToken = this.hashRefreshToken(refreshToken);
        const { expDateAccessToken, expDateRefreshToken } = this.decodeAndExtractExpiryDates({ accessToken, refreshToken });
        const userId = user.idUtilisateur;
        await this.updateRefreshTokenHash({ userId, hashRefreshToken });


        /*
        response.cookie("Authentification", accessToken, {
            httpOnly: true,
            expires: accessTokenPayload.exp
        })
          */
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
