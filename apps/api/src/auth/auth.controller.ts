import { Controller, HttpCode, HttpStatus, Post, Body, Get, UseGuards, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { AuthGuard } from './auth.guard';
import type { Response } from 'express';
import { RegisterDto } from './dto/register.dto';
import { UtilisateurPublic } from '../utilisateurs/utilisateur.types';

@Controller('/api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {

    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) response: Response): Promise<{ access_token: string, user_profile: UtilisateurPublic | null }> {
        const { access_token, access_token_exp, refresh_token, refresh_token_exp, user_profile } = await this.authService.signIn({ email: signInDto.email }, signInDto.password);

        response.cookie("refreshToken", refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "lax",
            /*Si api et front sur sites différents
            sameSite: "none",
            secure: true,
            */
            expires: refresh_token_exp
        })

        response.cookie("accessToken", access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "lax",
            /*Si api et front sur sites différents
            sameSite: "none",
            secure: true,
            */
            expires: access_token_exp
        })

        return {
            access_token: access_token,
            user_profile
        }

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

