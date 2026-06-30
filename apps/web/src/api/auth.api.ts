
type Login = {
    email: string;
    password: string;
}

type ResponseLoginApi = {
    ok: boolean
    errors: string
    data: string
}

export const fetchLogin = async (credentials: Login) => {

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
    /*
    console.log(`data = ${data}`)
    console.log(`responseLoginApi = ${responseLoginApi.errors}`)
    console.log(`responseLoginApi = ${responseLoginApi.data}`)
    */
    return responseLoginApi;

}