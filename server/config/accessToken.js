import jwt from "jsonwebtoken"

export function generateAccessToken(id,email){
    const payload = {
        id,
        email
    }
    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"7d"})
}
