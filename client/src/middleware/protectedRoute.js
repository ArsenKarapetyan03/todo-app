import { Navigate } from "react-router-dom";
import { useAuth } from "../Auth/context/AuthContext.js";

export default function ProtectedRoute({ children }) {
    
    const { token } = useAuth();

    return token ? children : <Navigate to="/login" replace/>;
}