import { useState } from "react";
import api from "../api/api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = async () => {
        const res = await api.post("/auth/login", { email, password });
        const token = res.data.token;

        localStorage.setItem("token", token);

        const payload = JSON.parse(atob(token.split(".")[1]));

        if (payload.role === "ADMIN") {
            window.location.href = "/admin";
        } else {
            window.location.href = "/sweets";
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
            <button onClick={submit}>Login</button>
            <p onClick={() => window.location.href = "/register"}>Register</p>
        </div>
    );
}
