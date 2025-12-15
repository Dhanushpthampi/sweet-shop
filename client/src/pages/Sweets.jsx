import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

export default function Sweets() {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  const loadAll = async () => {
    try {
      const res = await api.get("/sweets");
      setSweets(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const smartSearch = async (value) => {
    if (!value.trim()) {
      loadAll();
      return;
    }

    const params = {};

    if (value.includes("-")) {
      const [min, max] = value.split("-");
      params.minPrice = min;
      params.maxPrice = max;
    } else if (!isNaN(value)) {
      params.minPrice = value;
    } else {
      params.name = value;
    }

    try {
      const res = await api.get("/sweets/search", { params });
      setSweets(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      smartSearch(search);
    }, 500);

    setTypingTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [search]);

  const purchase = async (id) => {
    try {
      await api.post(`/sweets/${id}/purchase`);
      loadAll();
      alert("✅ Purchase successful!");
    } catch (e) {
      alert("❌ Purchase failed.");
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <div>
      <Navbar />
      
      {/* Hero Banner */}
      <div style={{
        background: "linear-gradient(135deg, var(--beige) 0%, var(--white) 100%)",
        borderBottom: "3px solid var(--gold)",
        padding: "4rem 2rem 3rem",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>Kata</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", marginBottom: "2rem" }}>
          Premium Handcrafted Sweets
        </p>
        
        {/* Centered Search Bar - text NOT centered */}
        <div style={{ 
          maxWidth: "600px", 
          margin: "0 auto",
          position: "relative"
        }}>
          <i className='bx bx-search' style={{ 
            position: "absolute", 
            left: "20px", 
            top: "50%", 
            transform: "translateY(-50%)", 
            fontSize: "1.5rem", 
            color: "var(--gold)" 
          }}></i>
          <input
            className="input-field"
            style={{ 
              paddingLeft: "60px",
              paddingRight: "20px",
              fontSize: "1.1rem",
              borderBottom: "2px solid var(--gold)"
            }}
            placeholder="Search sweets, category, or price range (e.g., 10-50)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="container">
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
          gap: "2rem",
          marginTop: "3rem"
        }}>
          {sweets.map((s) => (
            <div key={s._id} style={{
              background: "var(--white)",
              border: "2px solid var(--gray-light)",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--gold)";
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--gray-light)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
            >
              {/* Product Image */}
              <div style={{ 
                height: "200px", 
                overflow: "hidden",
                borderBottom: "2px solid var(--gold)"
              }}>
                <img 
                  src={s.imageUrl || "/sweet-placeholder.png"} 
                  alt={s.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                  onError={(e) => {
                    e.target.src = "/sweet-placeholder.png";
                  }}
                />
              </div>

              {/* Product Details */}
              <div style={{ padding: "1.5rem" }}>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "flex-start",
                  marginBottom: "1rem"
                }}>
                  <div style={{ flex: "1" }}>
                    <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{s.name}</h3>
                    <span style={{ 
                      fontSize: "0.85rem", 
                      color: "var(--gold)", 
                      textTransform: "uppercase",
                      letterSpacing: "1px"
                    }}>
                      {s.category}
                    </span>
                  </div>
                </div>

                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  marginTop: "1.5rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid var(--gray-light)"
                }}>
                  <div>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>PRICE</p>
                    <p style={{ fontSize: "1.8rem", fontWeight: "700", color: "var(--gold)" }}>₹{s.price}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>STOCK</p>
                    <p style={{ 
                      fontSize: "1.2rem", 
                      fontWeight: "600",
                      color: s.quantity > 0 ? "var(--text-primary)" : "#ef4444"
                    }}>
                      {s.quantity}
                    </p>
                  </div>
                </div>

                <button
                  className="btn-primary"
                  disabled={s.quantity === 0}
                  onClick={() => purchase(s._id)}
                  style={{ 
                    marginTop: "1.5rem", 
                    width: "100%",
                    padding: "14px",
                    opacity: s.quantity === 0 ? 0.5 : 1
                  }}
                >
                  {s.quantity === 0 ? "Out of Stock" : "Purchase"}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {sweets.length === 0 && (
          <div style={{ 
            textAlign: "center", 
            padding: "6rem 2rem", 
            color: "var(--text-secondary)" 
          }}>
            <i className='bx bx-search-alt' style={{ fontSize: "4rem", marginBottom: "1rem", color: "var(--gold)" }}></i>
            <p style={{ fontSize: "1.2rem" }}>No sweets found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}