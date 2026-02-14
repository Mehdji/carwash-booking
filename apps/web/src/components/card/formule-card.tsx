import { Icon } from "@iconify/react";
import type { DetailedHTMLProps, ReactNode } from "react";

interface prices_typeOfCar {
    price_1: React.ReactNode,
    type_vehicle_1: React.ReactNode,
    price_2: React.ReactNode,
    type_vehicle_2: React.ReactNode,
    price_3: React.ReactNode,
    type_vehicle_3: React.ReactNode,
    title: React.ReactNode,
    icon: React.ReactNode,
    description: React.ReactNode

}

export const Price = ({ text }: { text: string })=>{
    return <p className="price text-xs">{text}</p>
}

export const TypeVehicle = ({ text }: { text: string })=>{
    return <p className="price text-xs">{text}</p>
}

export const Title = ({ text }: { text: string })=>{
    return <p className="title-position title text-white font-extrabold text-xl">{text}</p>
}

export const Icon_card = ({ text }: { text: string }) => {
  return <Icon icon={text} width="45" color="#009DFF"/>;
}

export const Description = ({ list }: { list: Array<String> }) => {
    const services_list:ReactNode= list.map((service, index) => <li key={index} className="subtitle-position subtitle text-center  " >{service}</li>)
    return <ul className="list-disc list-inside  " >{services_list}</ul>;
}



const prices_cards = ({price_1,type_vehicle_1, price_2, type_vehicle_2,price_3, type_vehicle_3,title,icon,description}:prices_typeOfCar)=>{

    return(
        <div className="flex flex-col h-[500] gap-5 py-10 items-center bg-card w-sm rounded-2xl mx-auto shadow-xl shadow-black">
            <div className="container_square flex flex-row gap-7 mt-3 text-center ">
                <div className="square_and_Type flex flex-col items-center ">
                    <div className="bg-square_price rounded-lg text-white font-sans flex flex-col justify-center mb-2 h-10 w-10 ">
                        {price_1}
                    </div>
                    {type_vehicle_1}
                </div>
                <div className="square_and_Type flex flex-col items-center">
                    <div className="bg-square_price rounded-lg text-white font-sans flex flex-col justify-center mb-2 h-10 w-10">
                        {price_2}
                    </div>
                    {type_vehicle_2}
                </div>
                <div className="square_and_Type flex  flex-col items-center">
                    <div className="bg-square_price   rounded-lg text-white font-sans flex flex-col justify-center mb-2 h-10 w-10">
                        {price_3}
                    </div>
                    {type_vehicle_3}
                </div>
            </div>
            <div className="title">
                {title}
            </div>
            <div className="icon  ">
                {icon}
            </div>
            <div className="description ">
                {description}
            </div>
        </div>
        

    );

}

export default prices_cards