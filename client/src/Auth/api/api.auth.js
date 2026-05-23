export async function registerUser({ name, email, password }) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    
    if (!response.ok) {
        alert(data.message || "Registration failed")
        throw new Error(data.message || "Registration failed");
    }
    
    return data;
}
export async function loginUser({ name, email, password }) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    
    if (!response.ok) {
        alert(data.message || "Login failed")
        throw new Error(data.message || "Login failed");
    }
    
    return data;
}