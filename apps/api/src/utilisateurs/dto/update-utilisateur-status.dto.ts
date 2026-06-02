import { IsBoolean, IsNumberString } from "class-validator";

export class UpdateUtilisateurStatusDto {

    @IsBoolean()
    actif!: boolean;
}