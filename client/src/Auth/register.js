import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {registerUser} from "./api/api.auth.js"
import { useAuth } from "./context/AuthContext.js";
import "./authCSS/register.css"

export default function Register() {
    const navigate = useNavigate();
    const {login} = useAuth()
    const [loading, setLoading] = useState(false);

    async function handleRegister(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData(e.target);
            const name = formData.get("name");
            const email = formData.get("email");
            const password = formData.get("password");

            const data = await registerUser({ name, email, password })

            login(data.token)

            navigate("/todos");

        } catch (err) {
            alert(err.message || "Registration failed");
        } finally {
            setLoading(false);
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
                <button type="submit" disabled={loading}>
                    {loading ? "Creating account..." : "Register"}
                </button>
                {loading && <p className="loading-text">Connecting to server, please wait...</p>}
            </form>
            <div className="register-login-link">
                <p>If already have an account</p>
                <button type="button" onClick={()=>navigate("/login")}>Sign in</button>
            </div>
        </div>
    );
}
