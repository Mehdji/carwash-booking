import { Controller, HttpCode, HttpStatus, Post, Body, Get, UseGuards, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { AuthGuard } from './auth.guard';
import type { Response } from 'express';
import { RegisterDto } from './dto/register.dto';
import { UtilisateurPublic } from '../utilisateurs/utilisateur.types';
import type { AuthResponse, RefreshCookieData } from './types/auth.types';

@Controller('/api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {

    }

    private updateRefreshTokenCookie(data: RefreshCookieData, response: Response): void {
        response.cookie("refreshToken", data.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "lax",
            /*Si api et front sur sites différents
            sameSite: "none",
            secure: true,
            */
            expires: data.refresh_token_exp
        })

    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) response: Response): Promise<AuthResponse> {
        const { access_token, refresh_token, refresh_token_exp, user_profile } = await this.authService.signIn(
            { email: signInDto.email },
            signInDto.password
        );
        const cookieData = { refresh_token, refresh_token_exp };
        this.updateRefreshTokenCookie(cookieData, response);

        return {

            user_profile,
            access_token
        }

    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req): Promise<UtilisateurPublic | null> {
        return this.authService.getUtilisateurProfile(req.user.sub);
    }

    @Post('register')
    async register(@Body() registerdto: RegisterDto, @Res({ passthrough: true }) response: Response): Promise<AuthResponse> {
        const { access_token, refresh_token, refresh_token_exp, user_profile } = await this.authService.register(registerdto);
        const cookieData = { refresh_token, refresh_token_exp };
        this.updateRefreshTokenCookie(cookieData, response);

        return {
            user_profile,
            access_token
        }

    }
}

