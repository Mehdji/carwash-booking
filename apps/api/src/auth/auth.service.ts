import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';
import { Prisma } from '@prisma/client';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
    constructor(private readonly utilisateurService: UtilisateursService,

        private readonly password: PasswordService
    ) { }

    async signIn(email: Prisma.UtilisateurWhereUniqueInput, pass: string): Promise<any> {
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
        const { passwordHash, prenom, nom, ...result } = user;

        return result;
    }
}
