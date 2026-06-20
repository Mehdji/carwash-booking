import { Controller, Get, Param, Body, Post, Delete, Query, Patch, ParseIntPipe, NotFoundException, UseGuards } from "@nestjs/common";
import { UtilisateursService } from "./utilisateurs.service";
import { Utilisateur, Prisma, RoleUtilisateur } from "@prisma/client";
import { UpdateUtilisateurStatusDto } from "./dto/update-utilisateur-status.dto";
import { CreateUtilisateurDto } from "./dto/create-utilisateur.dto";
import { Roles } from "../auth/decorators/roles.decorator";
import { AuthGuard } from "../auth/auth.guard";
import { RolesGuard } from "../auth/decorators/roles.guards";
import { UtilisateurPublic } from "./utilisateur.types";

@UseGuards(AuthGuard, RolesGuard)
@Controller('api/users')
export class UtilisateursController {
    constructor(private readonly utilisateursService: UtilisateursService) { }

    @Roles(RoleUtilisateur.ADMIN)
    @Get()
    async getUtilisateurs(): Promise<UtilisateurPublic[]> {
        return this.utilisateursService.utilisateurs({

        })

    }

    @Roles(RoleUtilisateur.ADMIN)
    @Get('getFilteredUtilisateurs')
    async getFilteredUtilisateurs(@Query("searchString") searchString: string): Promise<UtilisateurPublic[]> {
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

    @Roles(RoleUtilisateur.ADMIN)
    @Get(':id')
    async getUtilisateur(@Param('id') id: string): Promise<UtilisateurPublic | null> {
        return this.utilisateursService.utilisateur({
            idUtilisateur: Number(id)
        })
    }


    @Roles(RoleUtilisateur.ADMIN)
    @Post()
    async create(@Body() utilisateurData: CreateUtilisateurDto): Promise<UtilisateurPublic> {
        const { prenom, nom, telephone, email, password, role } = utilisateurData;
        return this.utilisateursService.createUtilisateur({
            prenom,
            nom,
            telephone,
            email,
            password,
            role,


        })
    }

    @Roles(RoleUtilisateur.ADMIN)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<UtilisateurPublic> {
        try {
            return await this.utilisateursService.deleteUtilisateur({
                idUtilisateur: id
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`Utilisateur ${id} not found.`);
            }

            throw error;
        }
    }

    @Roles(RoleUtilisateur.ADMIN)
    @Patch(':id/status')
    async updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUtilisateurStatusDto: UpdateUtilisateurStatusDto,
    ): Promise<UtilisateurPublic> {

        try {
            return await this.utilisateursService.updateUtilisateur({
                where: { idUtilisateur: id },
                data: { actif: updateUtilisateurStatusDto.actif },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`Utilisateur ${id} not found.`);
            }

            throw error;
        }



    }



}


