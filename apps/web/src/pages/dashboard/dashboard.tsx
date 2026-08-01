
import { useUtilisateur } from "../../hooks/useUtilisateur"


const Dashboard = () => {
    //const [user, setUser] = useState<Utilisateur | null>(null);
    const { user, error, loading } = useUtilisateur();



    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Sorry, something went wrong...</div>;
    }

    if (!user) {
        return <div>Utilisateur introuvable.</div>;
    }

    return (
        <div>
            Bonjour {user.prenom} {user.nom}
        </div>
    );
};

export default Dashboard;
