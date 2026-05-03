import { Controller, Get } from "@nestjs/common";
import { UtilisateursService } from "./utilisateurs.service";

@Controller('api/users')
export class UtilisateursController {
    constructor(private readonly utilisateursService: UtilisateursService) { }

    @Get()
    getutilisateurs() {
        return this.utilisateursService.findAll();

    }
}