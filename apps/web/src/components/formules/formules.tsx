
import { Icon } from "@iconify/react";
import Card, { Price, TypeVehicle, Title, Description } from "../card/formule-card"

//TODO
//Hardcoded "formules" must be changed with values from the DB service.formules
const silver_services: string[] = ["Jantes","Shampouing","Séchage","Aspirateur"];
const silver_gold: string[] = ["Jantes","Shampouing","Cire de finition","Séchage","Vitres","Tapis / Moquette"];
const silver_platinium: string[] = ["Jantes","Pneus","Cire de finition","Séchage","Vitres","Plastiqes","Tapis","Shampouinage tissus"];


const formules = ()=>{
    return(
        <div className="bg-antracite  h-screen   ">
            <div className="container_services flex flex-col items-center h-full justify-center gap-20">
                <h1 className="text-white text-5xl font-bold text-center py-5 my-10 ">Nos formules</h1>
                <div className="cards_container flex flex-row w-7xl text-center mx-auto">
                    <Card 
                        price_1={<Price text="40€"/>}
                        type_vehicle_1={<TypeVehicle text="Citadine"/> }
                        price_2={<Price text="60€"/>} 
                        type_vehicle_2={<TypeVehicle text="Berline"/> }
                        price_3={<Price text="80€"/>}
                        type_vehicle_3={<TypeVehicle text="SUV"/> }
                        title={<Title text="Silver"/>}
                        icon={<Icon icon="material-symbols:star" width="75" height="75" />}
                        
                        description={<Description list={silver_services}/>}
                    />
                    <Card 
                        price_1={<Price text="50€"/>}
                        type_vehicle_1={<TypeVehicle text="Citadine"/> }
                        price_2={<Price text="70€"/>} 
                        type_vehicle_2={<TypeVehicle text="Berline"/> }
                        price_3={<Price text="100€"/>}
                        type_vehicle_3={<TypeVehicle text="SUV"/> }
                        title={<Title text="Silver"/>}
                        icon={<Icon icon="solar:cup-first-bold" color="#FFD700" width="75" height="75" />}
                        
                        description={<Description list={silver_gold}/>}
                        />
                        <Card 
                        price_1={<Price text="60€"/>}
                        type_vehicle_1={<TypeVehicle text="Citadine"/> }
                        price_2={<Price text="80€"/>} 
                        type_vehicle_2={<TypeVehicle text="Berline"/> }
                        price_3={<Price text="100€"/>}
                        type_vehicle_3={<TypeVehicle text="SUV"/> }
                        title={<Title text="Silver"/>}
                        icon={<Icon icon="material-symbols:crown" color="" width="75" height="75" />}
                        
                        description={<Description list={silver_platinium}/>}
                    />
                </div>
            </div>
        </div>
    );
}

export default formules;