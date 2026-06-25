import { Controller, HttpCode, HttpStatus, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { AuthGuard } from './auth.guard';

import { RegisterDto } from './dto/register.dto';
import { UtilisateurPublic } from '../utilisateurs/utilisateur.types';

@Controller('/api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {

    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto): Promise<{ access_token: string }> {


        return this.authService.signIn({ email: signInDto.email }, signInDto.password);

    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req): Promise<UtilisateurPublic | null> {
        return this.authService.getUtilisateurProfile(req.user.sub);
    }

    @Post('register')
    register(@Body() registerdto: RegisterDto): Promise<{ access_token: string; }> {
        return this.authService.register(registerdto);
    }
}

