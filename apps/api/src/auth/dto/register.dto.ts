import { IsString, IsEmail, MinLength } from "class-validator";



export class RegisterDto {
    @IsString()
    prenom!: string;

    @IsString()
    nom!: string;

    @IsString()
    telephone!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(13)
    password!: string;






}

