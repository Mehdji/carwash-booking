import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';
import { Prisma } from '@prisma/client';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { UtilisateurPublic } from '../utilisateurs/utilisateur.types';
import { JWT_REFRESH_SERVICE } from './auth.constants';


@Injectable()
export class AuthService {
    constructor(
        private readonly utilisateurService: UtilisateursService,
        private readonly password: PasswordService,
        private readonly jwtService: JwtService,
        @Inject(JWT_REFRESH_SERVICE) private readonly jwtRefreshService: JwtService
    ) { }



    async signIn(email: Prisma.UtilisateurWhereUniqueInput, pass: string): Promise<{ access_token: string, refresh_token: string }> {
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


        return {
            access_token: await this.jwtService.signAsync(payload),
            refresh_token: await this.jwtRefreshService.signAsync(payload)
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
