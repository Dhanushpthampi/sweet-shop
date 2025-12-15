import { useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);
      await api.post("/auth/register", { email, password });
      window.location.href = "/";
    } catch (error) {
      alert("Registration failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="split-screen reverse">
      {/* Form Panel - LEFT SIDE (reversed via direction: rtl) */}
      <div className="auth-panel slide-in-left">
        <div style={{ width: "100%", maxWidth: "450px" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <img src="/kata-icon.png" alt="Kata" style={{ width: "80px", height: "80px", marginBottom: "1.5rem" }} />
          </div>
          
          <h2 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Create Account</h2>
          <p style={{ color: "var(--gray-light)", marginBottom: "3rem" }}>
            Join our exclusive community
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
                placeholder="Create a password"
                value={password}
                onChange={e => setPassword(e.target.value)} 
              />
            </div>

            <button className="btn-primary" onClick={submit} disabled={loading} style={{ marginTop: "2rem", width: "100%" }}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <p style={{ textAlign: "center", color: "var(--gray-light)" }}>
              Already have an account? <Link to="/" style={{ fontWeight: "600" }}>Sign In</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Info Panel - RIGHT SIDE (reversed via direction: rtl) */}
      <div className="auth-info slide-in-right">
        <div>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
            Join Kata
          </h1>
          <div className="gold-line"></div>
          <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", marginBottom: "2rem", lineHeight: "1.8" }}>
            Become a member and unlock exclusive access to our premium collection of handcrafted sweets.
          </p>
          <ul style={{ listStyle: "none", fontSize: "1.1rem", color: "var(--text-secondary)" }}>
            <li style={{ marginBottom: "1rem" }}>
              <i className='bx bx-check' style={{ color: "var(--gold)", marginRight: "10px", fontSize: "1.5rem", verticalAlign: "middle" }}></i>
              Exclusive Member Pricing
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <i className='bx bx-check' style={{ color: "var(--gold)", marginRight: "10px", fontSize: "1.5rem", verticalAlign: "middle" }}></i>
              Early Access to New Products
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <i className='bx bx-check' style={{ color: "var(--gold)", marginRight: "10px", fontSize: "1.5rem", verticalAlign: "middle" }}></i>
              Personalized Recommendations
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
