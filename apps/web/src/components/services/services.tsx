import Card, { Description, Icon_card, Title } from "../card/card";

const services = ()=>{
    return(
        <div className="bg-black-service   h-screen   "  >
            <div className="container_services flex flex-col items-center h-full justify-center gap-20">
                <h1 id="services" className="text-white text-5xl font-bold text-center py-5 my-10  ">Nos services</h1>
                <div className="cards_container flex flex-row w-7xl text-center mx-auto  ">
                    <Card
                        icon_card = {
                            <Icon_card text="mdi:car-wash"/>
                        }
                        title = {
                            <Title text="Lavage extérieur"/>
                        }
                        description = {
                            <Description text="Nettoyage complet de la carrosserie, des jantes et des vitres extérieures."/>
                        }
                    />
                    <Card
                        icon_card = {
                            <Icon_card text="mdi:vacuum-cleaner"/>
                        }
                        title = {
                            <Title text="Lavage intèrieur"/>
                        }
                        description = {
                            <Description text="Aspiration, nettoyage des plastiques, vitres intérieures et traitement des tissus."/>
                        }
                    />
                    <Card
                        icon_card = {
                            <Icon_card text="lucide:smile"/>
                        }
                        title = {
                            <Title text="Lavage complet"/>
                        }
                        description = {
                            <Description text="Intérieur + extérieur pour un nettoyage complet et optimal."/>
                        }
                    />
                {/*
                <Card
                
                    logo="mdi:car-wash"
                    title="Lavage extérieur" 
                    subtitle="Nettoyage complet de la carrosserie, des jantes et des vitres extérieures."  
                    />
                    <Card 
                    logo="mdi:vacuum-cleaner"
                    title="Lavage intèrieur" 
                    subtitle="Aspiration, nettoyage des plastiques, vitres intérieures et traitement des tissus."  
                    />
                    <Card 
                    logo="lucide:smile"
                    title="Lavage complet" 
                    subtitle="Intérieur + extérieur pour un nettoyage complet et optimal."  
                    />
                    */}
                </div>
            </div>
        </div>
    );
}

export default services;