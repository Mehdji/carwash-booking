import { Controller, Get, Param, Body, Post, Delete, Query, Patch, ParseIntPipe, HttpException, HttpStatus } from "@nestjs/common";
import { UtilisateursService } from "./utilisateurs.service";
import { Utilisateur, Prisma } from "@prisma/client";
import { $Enums } from "@prisma/client";
import { isNumberString } from 'class-validator'
import { NotFoundException } from '@nestjs/common';
import { get } from "http";
import { UpdateUtilisateurStatusDto } from "./dto/update-utilisateur-status.dto";
import { CreateUtilisateurDto } from "./dto/create-utilisateur.dto";

@Controller('api/users')
export class UtilisateursController {
    constructor(private readonly utilisateursService: UtilisateursService) { }

    @Get()
    async getUtilisateurs(): Promise<Utilisateur[]> {
        return this.utilisateursService.utilisateurs({

        })

    }

    @Get('getFilteredUtilisateurs')
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
    /*
        //TODO Implémenter password.service.ts pour hash temporairement le password
        //TODO A TESTER MAIS PROBABLEMENT A REFACTO AC LES DATA DANS LE BODY DE LA REQUETE EN JSON
        @Post()
        async create(@Body() utilisateurData: CreateUtilisateurDto): Promise<Utilisateur> {
            const { prenom, nom, email, telephone, password, role } = utilisateurData;
            return this.utilisateursService.createUtilisateur({
                prenom,
                nom,
                telephone,
                email,
                password,
                role,
    
    
            })
        }
    */
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Utilisateur> {
        return this.utilisateursService.deleteUtilisateur({
            idUtilisateur: Number(id)
        })
    }

    //TODO AJOUTER UNE PROMISE EN RETOUR ET GERER EXCEPTIONS
    @Patch(':id/status')
    async updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUtilisateurStatusDto: UpdateUtilisateurStatusDto,
    ): Promise<Utilisateur> {

        try {
            return await this.utilisateursService.updateUtilisateur({
                where: { idUtilisateur: Number(id) },
                data: { actif: updateUtilisateurStatusDto.actif },
            });
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: `Utilisateur ${id} not found.`,
            }, HttpStatus.NOT_FOUND, {
                cause: error
            }

            );
        }



    }



}


/*
@Patch(':id/status')
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
*/ 