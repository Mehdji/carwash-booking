
type login = {
    email: string;
    password: string;
}

export const fetchLogin = async (credentials: login) => {

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
    const data = response.json();


    return data;

}