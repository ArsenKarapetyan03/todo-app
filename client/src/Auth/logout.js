import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./authCSS/logout.css"

export default function Logout(){

    const navigate = useNavigate()
    const {logout} = useAuth()
    const handleLogout = function(){
        logout()
        navigate("/login", { replace: true });
    }
    
    return(
        <button className="logout-button" onClick={handleLogout}>Logout</button>
    )
}