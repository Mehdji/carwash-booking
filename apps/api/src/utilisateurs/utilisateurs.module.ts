import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UtilisateursService } from "./utilisateurs.service";
import { UtilisateursController } from "./utilisateurs.controller";
import { PasswordService } from "../auth/password.service";


@Module({
    providers: [UtilisateursService, PrismaService, PasswordService],
    exports: [UtilisateursService],
    controllers: [UtilisateursController]
})

export class UtilisateursModule { }