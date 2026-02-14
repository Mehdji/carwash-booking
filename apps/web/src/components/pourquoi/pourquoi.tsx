
import Card, { Description, Icon_card, Title } from "../card/card";

const Pourquoi = ()=>{
    return(
        <div className="bg-pourquoi h-screen pt-20 ">
            <div className="container_services flex pt-10 flex-col items-center h-full justify-items-start gap-20">
                <h1 id="pourquoi" className="text-white text-5xl font-bold text-center py-5 my-10 ">Pourquoi nous choisir?</h1>
                <div className="cards_container flex flex-row w-7xl text-center mx-auto">
                   <Card
                        icon_card = {
                            <Icon_card text="fluent:premium-12-regular"/>
                        }
                        title = {
                            <Title text="Qualité supérieur"/>
                        }
                        description = {
                            <Description text="Nettoyage expert, résultat impeccable."/>
                        }
                        height={260}
                    />
                    <Card
                        icon_card = {
                            <Icon_card text="material-symbols:bolt-outline"/>
                        }
                        title = {
                            <Title text="Service rapide"/>
                        }
                        description = {
                            <Description text="Prise en charge immédiate."/>
                        }
                        height={260}
                    />
                    <Card
                        icon_card = {
                            <Icon_card text="material-symbols:verified-outline"/>
                        }
                        title = {
                            <Title text="Confiance garantie"/>
                        }
                        description = {
                            <Description text="Transparence et travail soigné."/>
                        }
                        height={260}
                    />
                </div>
            </div>
        </div>
    );
}

export default Pourquoi;
