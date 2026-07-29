import type { UtilisateurPublic } from "../../utilisateurs/utilisateur.types"

export type RefreshCookieData = {

    refresh_token: string,
    refresh_token_exp: Date
}

export type AuthResult = {

    access_token: string;
    access_token_exp: Date;
    refresh_token: string;
    refresh_token_exp: Date;
    user_profile: UtilisateurPublic | null;
}

export type AuthResponse = Pick<
    AuthResult,
    'access_token' | 'user_profile'
>;

