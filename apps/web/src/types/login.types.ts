export type Login = {
    email: string;
    password: string;
}

export type ResponseLoginApi = {
    ok: boolean
    errors: string
    data: string
}