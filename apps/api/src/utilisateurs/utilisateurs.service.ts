import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { Utilisateur } from "@prisma/client";
import { PasswordService } from "../auth/password.service";
import { CreateUtilisateurDto } from "./dto/create-utilisateur.dto";

@Injectable()
export class UtilisateursService {
    constructor(private readonly prisma: PrismaService,
        private readonly passwordService: PasswordService
    ) { }

    async utilisateur(utilisateurWhereUniqueInput: Prisma.UtilisateurWhereUniqueInput): Promise<Utilisateur | null> {
        return this.prisma.utilisateur.findUnique({
            where: utilisateurWhereUniqueInput,
        });
    }

    async utilisateurs(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UtilisateurWhereUniqueInput;
        where?: Prisma.UtilisateurWhereInput;
        orderBy?: Prisma.UtilisateurOrderByWithRelationInput;


    }): Promise<Utilisateur[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.utilisateur.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createUtilisateur(dto: CreateUtilisateurDto): Promise<Utilisateur> {
        //TODO ici solution temporaire de hashage dans le service utilisateur, a remplacé durant la 
        //futur implémentation du service auth.

        const passwordHash = await this.passwordService.hashPassword(dto.password);
        return this.prisma.utilisateur.create({
            data: {
                prenom: dto.prenom,
                nom: dto.nom,
                telephone: dto.telephone,
                email: dto.email,
                passwordHash: passwordHash,
                role: dto.role
            }
        });
    }

    async updateUtilisateur(params: {
        where: Prisma.UtilisateurWhereUniqueInput;
        data: Prisma.UtilisateurUpdateInput;
    }): Promise<Utilisateur> {
        const { where, data } = params;
        return this.prisma.utilisateur.update({
            where,
            data,
        }
        )
    }

    async deleteUtilisateur(where: Prisma.UtilisateurWhereUniqueInput): Promise<Utilisateur> {
        return this.prisma.utilisateur.delete({
            where,
        });

    }

    async utilisateurParEmail(email: Prisma.UtilisateurWhereUniqueInput): Promise<Utilisateur | null> {
        return this.prisma.utilisateur.findUnique({
            where: email,

        });

    }
}