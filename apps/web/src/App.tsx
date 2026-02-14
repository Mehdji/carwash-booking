
import Navbar from "./components/navbar/navbar";
import Hero from "./components/hero/hero";
import Services from "./components/services/services";
import Formules from "./components/formules/formules";
import Pourquoi from "./components/pourquoi/pourquoi";



export default function App() {
  

  return(
    <div >
      <Navbar/>
      <Hero/>
      <Services/>
      <Formules/>
      <Pourquoi/>
      
    </div>
  );
}