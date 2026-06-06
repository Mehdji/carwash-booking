import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';
import { Prisma } from '@prisma/client';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly utilisateurService: UtilisateursService,
        private readonly password: PasswordService,
        private readonly jwtService: JwtService
    ) { }

    async signIn(email: Prisma.UtilisateurWhereUniqueInput, pass: string): Promise<{ access_token: string }> {
        const user = await this.utilisateurService.utilisateurParEmail(email);
        //console.log("signin controller reached.");

        if (!user) {
            //console.log(`Can't find user ${email}`);
            throw new UnauthorizedException();

        }
        const userHashedPassword = user?.passwordHash;

        if (!await this.password.verifyPassword(userHashedPassword, pass)) {
            //console.log(`Pass don't match.`);
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
