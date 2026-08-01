import { useEffect, useState } from "react";
import { getUser } from "../api/auth.api";
import type { Utilisateur } from "../types/utilisateur.types";

export const useUtilisateur = () => {
    const [user, setUser] = useState<Utilisateur | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);


    useEffect(() => {
        const loadUser = async () => {
            try {
                setUser(await getUser());
            } catch (error) {
                setError(error instanceof Error ? error : new Error("Erreur inconnue"));
            } finally {
                setLoading(false);
            }


        };
        loadUser();
    }, []);
    return { user, loading, error }

}