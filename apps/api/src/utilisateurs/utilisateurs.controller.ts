import { Controller, Get, Param, Body, Post, Delete, Query, Patch } from "@nestjs/common";
import { UtilisateursService } from "./utilisateurs.service";
import { Utilisateur, Prisma } from "../../generated/prisma";
import { $Enums } from "../../generated/prisma/browser";
import { NotFoundException } from '@nestjs/common';
import { get } from "http";

@Controller('api/users')
export class UtilisateursController {
    constructor(private readonly utilisateursService: UtilisateursService) { }

    @Get()
    async getUtilisateurs(): Promise<Utilisateur[]> {
        return this.utilisateursService.utilisateurs({

        })

    }

    @Get()
    async getFilteredUtilisateurs(@Query("searchString") searchString: string): Promise<Utilisateur[]> {
        const parsedDate = new Date(searchString);
        const isValidDate = !Number.isNaN(parsedDate.getTime());
        const orFilters: Prisma.UtilisateurWhereInput[] = [
            { nom: { equals: searchString } },
            { prenom: { equals: searchString } },
            { telephone: { equals: searchString } }
        ];

        if (isValidDate) {
            const startOfDay = new Date(parsedDate);
            startOfDay.setHours(0, 0, 0, 0);

            const nextDay = new Date(startOfDay);
            nextDay.setDate(nextDay.getDate() + 1);

            orFilters.push({
                dateInscription: {
                    gte: startOfDay,
                    lt: nextDay
                }
            });
        }

        return this.utilisateursService.utilisateurs({
            where: {
                OR: orFilters
            }

        })

    }


    @Get(':id')
    async getUtilisateur(@Param('id') id: string): Promise<Utilisateur | null> {
        return this.utilisateursService.utilisateur({
            idUtilisateur: Number(id)
        })
    }

    @Post()
    async create(@Body() utilisateurData: {
        prenom?: string | null | undefined;
        nom?: string | null | undefined;
        telephone: string;
        passwordHash: string;
        role?: $Enums.RoleUtilisateur;
        dateInscription?: Date | string;
        actif?: boolean;
    }): Promise<Utilisateur> {
        const { prenom, nom, telephone, passwordHash, role, dateInscription, actif } = utilisateurData;
        return this.utilisateursService.createUtilisateur({
            prenom,
            nom,
            telephone,
            passwordHash,
            role,
            dateInscription,
            actif
        })
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Utilisateur> {
        return this.utilisateursService.deleteUtilisateur({
            idUtilisateur: Number(id)
        })
    }

    @Patch(':id')
    async activateUtilisateur(@Query('parameter') parameter: string, @Param('id') id: string): Promise<Utilisateur> {
        if (parameter === 'deactivate') {
            return this.utilisateursService.updateUtilisateur({
                where: {
                    idUtilisateur: Number(id),

                },
                data: {
                    actif: false
                }

            })
        } else if (parameter === 'activate') {
            return this.utilisateursService.updateUtilisateur({
                where: {
                    idUtilisateur: Number(id),

                },
                data: {
                    actif: true
                }

            })


        }
        const user = await this.utilisateursService.utilisateur({ idUtilisateur: Number(id) });
        if (!user) throw new NotFoundException(`Utilisateur ${id} not found`);
        return user;

    }

}


