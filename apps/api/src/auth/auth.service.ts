import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';
import { Prisma, Utilisateur } from '@prisma/client';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';
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
}
