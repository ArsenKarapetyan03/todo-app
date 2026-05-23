import { useNavigate } from "react-router-dom";
import {registerUser} from "./api/api.auth.js"
import { useAuth } from "./context/AuthContext.js";
import "./authCSS/register.css"

export default function Register() {
    const navigate = useNavigate();
    const {login} = useAuth()

    async function handleRegister(e) {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const name = formData.get("name");
            const email = formData.get("email");
            const password = formData.get("password");

            const data = await registerUser({ name, email, password })

            login(data.token)

            navigate("/todos");

        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="register-container">
            <h2>Create your account now</h2>
            <h3>Create your account to manage your dayworks</h3>

            <form className="register-form" onSubmit={handleRegister}>
                <div className="form-group">
                    <label htmlFor="inputName">Name</label>
                    <input type="text" name="name" id="inputName" autoComplete="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" autoComplete="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" autoComplete="new-password" required />
                </div>
                <button type="submit">Register</button>
            </form>
            <div className="register-login-link">
                <p>If already have an account</p>
                <button type="button" onClick={()=>navigate("/login")}>Sign in</button>
            </div>
        </div>
    );
}
