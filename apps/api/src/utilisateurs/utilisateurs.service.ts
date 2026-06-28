import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma, RoleUtilisateur } from "@prisma/client";
import { Utilisateur } from "@prisma/client";
import { PasswordService } from "../auth/password.service";
import { CreateUtilisateurDto } from "./dto/create-utilisateur.dto";
import { UtilisateurPublic } from "./utilisateur.types";


@Injectable()
export class UtilisateursService {
    constructor(private readonly prisma: PrismaService,
        private readonly passwordService: PasswordService
    ) { }

    async utilisateur(utilisateurWhereUniqueInput: Prisma.UtilisateurWhereUniqueInput): Promise<UtilisateurPublic | null> {
        return this.prisma.utilisateur.findUnique({
            where: utilisateurWhereUniqueInput,
            omit: { passwordHash: true, }
        });
    }

    async utilisateurs(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UtilisateurWhereUniqueInput;
        where?: Prisma.UtilisateurWhereInput;
        orderBy?: Prisma.UtilisateurOrderByWithRelationInput;


    }): Promise<UtilisateurPublic[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.utilisateur.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            omit: { passwordHash: true, }
        });
    }

    async createUtilisateur(dto: CreateUtilisateurDto): Promise<UtilisateurPublic> {
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
                role: RoleUtilisateur.CLIENT
            },
            omit: { passwordHash: true, }
        });
    }

    async updateUtilisateur(params: {
        where: Prisma.UtilisateurWhereUniqueInput;
        data: Prisma.UtilisateurUpdateInput;
    }): Promise<UtilisateurPublic> {
        const { where, data } = params;
        return this.prisma.utilisateur.update({
            where,
            data,
            omit: { passwordHash: true, }
        }
        )
    }

    async deleteUtilisateur(where: Prisma.UtilisateurWhereUniqueInput): Promise<UtilisateurPublic> {
        return this.prisma.utilisateur.delete({
            where,
            omit: { passwordHash: true, }
        });

    }

    async utilisateurParEmail(email: Prisma.UtilisateurWhereUniqueInput): Promise<UtilisateurPublic | null> {
        return this.prisma.utilisateur.findUnique({
            where: email,
            omit: { passwordHash: true, }
        });

    }

    async findUtilisateurAvecHashParEmail(email: Prisma.UtilisateurWhereUniqueInput): Promise<Pick<Utilisateur, 'idUtilisateur' | 'passwordHash' | 'role' | 'actif'> | null> {
        return this.prisma.utilisateur.findUnique({
            where: email,
            select: { idUtilisateur: true, passwordHash: true, role: true, actif: true },
        });
    }
}