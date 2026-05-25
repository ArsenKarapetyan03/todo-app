import { useNavigate } from "react-router-dom";
import {loginUser} from "./api/api.auth.js"
import { useAuth } from "./context/AuthContext.js";
import "./authCSS/login.css"

export default function Login(){
    const navigate = useNavigate()
    const {login} = useAuth()

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const email = formData.get("email");
            const password = formData.get("password");

            const data = await loginUser({ email, password })

            login(data.token)

            navigate("/todos");

        } catch (err) {
            alert(err.message || "Login failed");
        }
    }


    return(
    <div className="login-container">
        <h1>Log in for today’s deals</h1>
        <h3>Log in to your account to have an access your ToDo List</h3>
        <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required autoComplete="email" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" required autoComplete="current-password" />
            </div>
            <button type="submit">Sign in</button>
        </form>
        <div className="login-register-link">
            <p>Dont you have an account?</p>
            <p>Then Register now</p>
            <button type="button" onClick={()=>navigate('/register')}>Register</button>    
        </div>
    </div>)
}


