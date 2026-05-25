import {generateAccessToken} from "../config/accessToken.js"
import bcrypt from "bcrypt"
import pool from "../config/db.js"


export async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name.trim() || !email.trim() || !password.trim()) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const existingUser = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userResult = await pool.query(
            "INSERT INTO users(name,email,password) VALUES ($1,$2,$3) RETURNING id, name, email",
            [name, email, hashedPassword]
        );

        const user = userResult.rows[0];

        const token = generateAccessToken(user.id, user.email);

       return res.status(201).json({
            token,
            user
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        const userResult = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = userResult.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateAccessToken(user.id, user.email);

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}