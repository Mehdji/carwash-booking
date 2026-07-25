import { $Enums } from "@prisma/client"

export type Payload = {
    sub: number,
    role: $Enums.RoleUtilisateur
}

export type TokenPayload = Payload & {
    iat: number,
    exp: number
}

export type Tokens = {
    accessToken: string,
    refreshToken: string
}

export type TokenExpiryDatesInS = {
    refreshTokenPayload: TokenPayload,
    accessTokenPayload: TokenPayload

}

export type TokenExpiryDatesInMs = {
    expDateRefreshToken: Date,
    expDateAccessToken: Date

}

export type TokenUpdateData = {
    userId: number,
    hashRefreshToken: string
}