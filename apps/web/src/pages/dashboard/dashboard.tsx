import { useEffect, useState } from "react";
import type { Utilisateur } from "../../types/utilisateur.types";
import { getUser } from "../../api/auth.api";



const Dashboard = () => {
    const [user, setUser] = useState<Utilisateur | null>(null);
    useEffect(() => {
        const loadUser = async () => {
            try {
                const user = await getUser();
                setUser(user);
            } catch (error) {
                console.error(error);
            }

        }

        loadUser();
    }, [])
    return (
        <div>
            {user ? `Bonjour ${user.prenom ?? ""} ${user.nom ?? ""}` : "Chargement..."}
        </div>
    )
}

export default Dashboard;
