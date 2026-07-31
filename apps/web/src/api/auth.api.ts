import type { Utilisateur } from "../types/utilisateur.types"
import type { Login, ResponseLoginApi } from "../types/login.types"


export const fetchLogin = async (credentials: Login): Promise<ResponseLoginApi> => {

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
        }),
    })


    const data = await response.json();




    const responseLoginApi: ResponseLoginApi = {
        ok: response.ok,
        errors: response.ok == true ? null : data.statusCode,
        data: response.ok == false ? null : data.access_token
    }

    return responseLoginApi;

}

export const getUser = async (): Promise<Utilisateur> => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },


    })

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result.nom)
    const { idUtilisateur, nom, prenom, telephone, email, role, dateInscription } = result;

    return {
        idUtilisateur,
        nom,
        prenom,
        telephone,
        email, role,
        dateInscription
    }

}