import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UtilisateursService } from "./utilisateurs.service";
import { UtilisateursController } from "./utilisateurs.controller";


@Module({
    providers: [UtilisateursService, PrismaService],
    exports: [UtilisateursService],
    controllers: [UtilisateursController]
})

export class UtilisateursModule { }