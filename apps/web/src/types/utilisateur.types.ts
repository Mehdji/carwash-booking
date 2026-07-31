export type RoleUtilisateur = "ADMIN" | "AGENT" | "CLIENT";

export type Utilisateur = {
    idUtilisateur: number;
    nom: string | null;
    prenom: string | null;
    telephone: string;
    email: string;
    role: RoleUtilisateur;
    dateInscription: string;
};



