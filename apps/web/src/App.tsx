
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import Login from "./components/login/login";

export default function App() {
  return (
    
      <Routes>
        <Route path="/" element= {<LandingPage/>} />
        <Route path="/login" element = {<Login/>} />
      </Routes>
    
  );
}
