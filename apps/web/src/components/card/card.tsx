import { Icon } from "@iconify/react";

export const Icon_card = ({ text }: { text: string }) => {
  return <Icon icon={text} width="45" color="#009DFF"/>;
}

export const Title = ({ text }: { text: string }) => {
    return <h1 className="title-position title text-white font-extrabold text-xl">{text}</h1>;
}

export const Description = ({ text }: { text: string }) => {
    return <h2 className="subtitle-position subtitle w-1/2">{text}</h2>;
}


interface CardProps {
    icon_card: React.ReactNode;
    title: React.ReactNode;
    description: React.ReactNode;
    height?: number;
    
}

/*
interface Props{
    logo: string;
    title: string;
    subtitle: string;
    description?: string;
    imageUrl?: string;
}

const card = ({logo,title, subtitle, description, imageUrl}:Props)=>{
    return(
        <div className="bg-card w-sm rounded-2xl mx-auto h-1/2">
            <div className="card flex flex-col items-center py-10 gap-5">
                <Icon icon={logo} width="45" color="#009DFF"/>
                <h1 className="title-position title text-white font-extrabold text-xl">{title}</h1>
                <h2 className="subtitle-position subtitle w-1/2">{subtitle}</h2>
                 
               
            </div>
        </div>
    );
}
*/

const card = ({icon_card, title, description,height = 320}:CardProps)=>{
    return(
        
        <div className="bg-card w-sm rounded-2xl mx-auto shadow-xl shadow-black "
        style={{ height: `${height}px` }}
        >
            
            <div className="card flex flex-col items-center py-10 gap-5">
                {icon_card}
                {title}
                {description}
                {/*
                <Icon icon={logo} width="45" color="#009DFF"/>
                <h1 className="title-position title text-white font-extrabold text-xl">{title}</h1>
                <h2 className="subtitle-position subtitle w-1/2">{subtitle}</h2>
                 */}
               
            </div>
        </div>
    );
}
export default card;