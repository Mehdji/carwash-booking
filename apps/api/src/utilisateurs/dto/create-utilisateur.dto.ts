import { IsNumber, IsString, IsEnum, IsEmail, MinLength, IsOptional } from "class-validator";

import { RoleUtilisateur } from "@prisma/client";

export class CreateUtilisateurDto {
    @IsString()
    prenom!: string;

    @IsString()
    nom!: string;

    @IsNumber()
    telephone!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(13)
    password!: string;

    @IsOptional()
    @IsEnum(RoleUtilisateur)
    role!: RoleUtilisateur






}

