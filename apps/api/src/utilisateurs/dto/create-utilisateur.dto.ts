import { IsNumber, IsString, IsEnum } from "class-validator";
import { $Enums } from "../../../generated/prisma/browser";
import { RoleUtilisateur } from "../../../generated/prisma";

export class CreateUtilisateurDto {
    @IsString()
    prenom!: string;

    @IsString()
    nom!: string;

    @IsNumber()
    telephone!: number;

    @IsEnum(RoleUtilisateur)
    role!: $Enums.RoleUtilisateur






}

