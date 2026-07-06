import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';
import { Prisma, Utilisateur } from '@prisma/client';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { error } from 'console';
import { UtilisateurPublic } from '../utilisateurs/utilisateur.types';


@Injectable()
export class AuthService {
    constructor(
        private readonly utilisateurService: UtilisateursService,
        private readonly password: PasswordService,
        private readonly jwtService: JwtService
    ) { }



    async signIn(email: Prisma.UtilisateurWhereUniqueInput, pass: string): Promise<{ access_token: string }> {
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
