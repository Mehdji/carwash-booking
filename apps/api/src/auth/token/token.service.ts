import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Inject } from '@nestjs/common';
import { JWT_REFRESH_SERVICE } from '../auth.constants';
import { Payload, Tokens, TokenPayload, TokenExpiryDatesInS, TokenExpiryDatesInMs } from './types/token.types';
import { createHash } from 'crypto';
@Injectable()
export class TokenService {
    constructor(

        private readonly jwtService: JwtService,
        @Inject(JWT_REFRESH_SERVICE) private readonly jwtRefreshService: JwtService) { }
    async generateTokens(payload: Payload): Promise<Tokens> {
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtRefreshService.signAsync(payload);
        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    }

    hashRefreshToken(refreshToken: string): string {
        const hashRefreshToken = createHash("sha256").update(refreshToken).digest("hex");
        return hashRefreshToken
    }

    decodeTokens(accessToken: string, refreshToken: string): { accessTokenPayload: TokenPayload, refreshTokenPayload: TokenPayload } {
        const accessTokenPayload = this.jwtService.decode<TokenPayload>(accessToken);
        const refreshTokenPayload = this.jwtRefreshService.decode<TokenPayload>(refreshToken);
        return {
            accessTokenPayload: accessTokenPayload,
            refreshTokenPayload: refreshTokenPayload
        }
    }

    extractExpiryDates(tokensPayload: TokenExpiryDatesInS): TokenExpiryDatesInMs {
        const expDateAccessToken = new Date(tokensPayload.accessTokenPayload.exp * 1000);
        const expDateRefreshToken = new Date(tokensPayload.refreshTokenPayload.exp * 1000);


        return {
            expDateRefreshToken: expDateRefreshToken,
            expDateAccessToken: expDateAccessToken
        }
    }

    decodeAndExtractExpiryDates(tokens: Tokens): { expDateRefreshToken: Date, expDateAccessToken: Date } {



        const { accessTokenPayload, refreshTokenPayload } = this.decodeTokens(tokens.accessToken, tokens.refreshToken);

        const { expDateRefreshToken, expDateAccessToken } = this.extractExpiryDates({ accessTokenPayload, refreshTokenPayload })
        return {
            expDateAccessToken: expDateAccessToken,
            expDateRefreshToken: expDateRefreshToken
        }
    }


}
