import { useState } from "react";
import api from "../api/api"; 
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  const submit = async () => {
    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.token;

      localStorage.setItem("token", token);

      const payload = JSON.parse(atob(token.split(".")[1]));

try {
  const payload = JSON.parse(atob(token.split(".")[1]));

  if (payload.role === "ADMIN") {
    navigate("/admin");
  } else {
    navigate("/sweets");
  }
} catch {
  localStorage.removeItem("token");
  alert("Invalid session. Please login again.");
}
    } catch (error) {
      alert("Login failed. Please check your credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="split-screen">
      {/* Info Panel - LEFT SIDE */}
      <div className="auth-info slide-in-left">
        <div>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
           Kata
          </h1>
          <div className="gold-line"></div>
          <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", marginBottom: "2rem", lineHeight: "1.8" }}>
            Experience luxury confectionery at its finest. Our premium sweets are crafted with the utmost care and attention to detail.
          </p>
          <ul style={{ listStyle: "none", fontSize: "1.1rem", color: "var(--text-secondary)" }}>
            <li style={{ marginBottom: "1rem" }}>
              <i className='bx bx-check' style={{ color: "var(--gold)", marginRight: "10px", fontSize: "1.5rem", verticalAlign: "middle" }}></i>
              Premium Quality Products
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <i className='bx bx-check' style={{ color: "var(--gold)", marginRight: "10px", fontSize: "1.5rem", verticalAlign: "middle" }}></i>
              Curated Selection
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <i className='bx bx-check' style={{ color: "var(--gold)", marginRight: "10px", fontSize: "1.5rem", verticalAlign: "middle" }}></i>
              Exclusive Deals
            </li>
          </ul>
        </div>
      </div>

      {/* Form Panel - RIGHT SIDE */}
      <div className="auth-panel slide-in-right">
        <div style={{ width: "100%", maxWidth: "450px" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <img src="/kata-icon.png" alt="Kata" style={{ width: "80px", height: "80px", marginBottom: "1.5rem" }} />
          </div>
          
          <h2 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Welcome Back</h2>
          <p style={{ color: "var(--gray-light)", marginBottom: "3rem" }}>
            Sign in to your account
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "var(--gray-light)", textTransform: "uppercase", letterSpacing: "1px" }}>
                Email Address
              </label>
              <input 
                className="input-field" 
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)} 
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "var(--gray-light)", textTransform: "uppercase", letterSpacing: "1px" }}>
                Password
              </label>
              <input 
                className="input-field" 
                type="password" 
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)} 
              />
            </div>

            <button className="btn-primary" onClick={submit} disabled={loading} style={{ marginTop: "2rem", width: "100%" }}>
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <p style={{ textAlign: "center", color: "var(--gray-light)" }}>
              Don't have an account? <Link to="/register" style={{ fontWeight: "600" }}>Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
