import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  
  // Check if user is admin by decoding JWT token
  let isAdmin = false;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      isAdmin = payload.role === "ADMIN";
    } catch (e) {
      console.error("Failed to decode token", e);
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/sweets" className="navbar-brand">
          <img src="/kata-logo.png" alt="Kata Logo" className="navbar-logo" />
          <h1 className="navbar-title">KATA</h1>
        </Link>

        <ul className="navbar-nav">
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/sweets" className="navbar-link">Shop</Link>
              </li>
              {isAdmin && (
                <li>
                  <Link to="/admin" className="navbar-link">Admin</Link>
                </li>
              )}
              <li>
                <button 
                  onClick={handleLogout} 
                  className="navbar-link"
                  style={{ 
                    background: "none", 
                    border: "none", 
                    cursor: "pointer",
                    font: "inherit"
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className="navbar-link">Login</Link>
              </li>
              <li>
                <Link to="/register" className="navbar-link">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
