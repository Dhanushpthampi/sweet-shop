import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

export default function Admin() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [sweets, setSweets] = useState([]);
  const [restockQty, setRestockQty] = useState({});
  const [editingId, setEditingId] = useState(null);

  const loadSweets = async () => {
    try {
      const res = await api.get("/sweets");
      setSweets(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const createSweet = async () => {
    if (!name || !category || !price || !quantity) return alert("All fields are required");

    try {
      await api.post("/sweets", {
        name,
        category,
        price: Number(price),
        quantity: Number(quantity),
        imageUrl: imageUrl || undefined
      });

      alert("Sweet created successfully");
      resetForm();
      loadSweets();
    } catch (e) {
      alert("Failed to create sweet");
    }
  };

  const updateSweet = async () => {
    if (!name || !category || !price || !quantity) return alert("All fields are required");

    try {
      await api.put(`/sweets/${editingId}`, {
        name,
        category,
        price: Number(price),
        quantity: Number(quantity),
        imageUrl: imageUrl || undefined
      });

      alert("Sweet updated successfully");
      resetForm();
      setEditingId(null);
      loadSweets();
    } catch (e) {
      alert("Failed to update sweet");
    }
  };

  const deleteSweet = async (id) => {
    if (!confirm("Are you sure you want to delete this sweet?")) return;

    try {
      await api.delete(`/sweets/${id}`);
      alert("Sweet deleted successfully");
      loadSweets();
    } catch (e) {
      alert("Failed to delete sweet");
    }
  };

  const startEdit = (sweet) => {
    setEditingId(sweet._id);
    setName(sweet.name);
    setCategory(sweet.category);
    setPrice(sweet.price.toString());
    setQuantity(sweet.quantity.toString());
    setImageUrl(sweet.imageUrl || "");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setQuantity("");
    setImageUrl("");
    setEditingId(null);
  };

  const restockSweet = async (id) => {
    const qty = Number(restockQty[id]);
    if (!qty || qty <= 0) {
      return alert("Enter valid restock quantity");
    }

    try {
      await api.post(`/sweets/${id}/restock`, {
        quantity: qty,
      });

      setRestockQty(prev => ({ ...prev, [id]: "" }));
      loadSweets();
      alert("Restock successful");
    } catch (e) {
      alert("Restock failed");
    }
  };

  useEffect(() => {
    loadSweets();
  }, []);

  return (
    <div>
      <Navbar />
      
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "3rem", borderBottom: "3px solid var(--gold)", paddingBottom: "2rem" }}>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "0.5rem" }}>Admin Dashboard</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>Manage your inventory and products</p>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr",
          gap: "3rem"
        }}>
          
          {/* Create/Edit Sweet Panel */}
          <div>
            <div style={{ 
              background: "var(--white)", 
              border: `2px solid ${editingId ? "#10b981" : "var(--gold)"}`,
              padding: "2rem",
              maxWidth: "800px",
              margin: "0 auto"
            }}>
              <h3 style={{ 
                fontSize: "1.3rem", 
                marginBottom: "2rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: editingId ? "#10b981" : "var(--text-primary)"
              }}>
                <i className={`bx ${editingId ? 'bx-edit' : 'bx-plus-circle'}`} style={{ marginRight: "10px", color: editingId ? "#10b981" : "var(--gold)" }}></i>
                {editingId ? "Edit Sweet" : "Add New Sweet"}
              </h3>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ 
                    display: "block", 
                    marginBottom: "0.5rem", 
                    fontSize: "0.85rem", 
                    color: "var(--text-secondary)",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    Sweet Name
                  </label>
                  <input 
                    className="input-field" 
                    placeholder="Enter name" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                  />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ 
                    display: "block", 
                    marginBottom: "0.5rem", 
                    fontSize: "0.85rem", 
                    color: "var(--text-secondary)",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    Category
                  </label>
                  <input 
                    className="input-field" 
                    placeholder="Enter category" 
                    value={category} 
                    onChange={e => setCategory(e.target.value)} 
                  />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ 
                    display: "block", 
                    marginBottom: "0.5rem", 
                    fontSize: "0.85rem", 
                    color: "var(--text-secondary)",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    Image URL (Optional)
                  </label>
                  <input 
                    className="input-field" 
                    placeholder="https://example.com/image.jpg" 
                    value={imageUrl} 
                    onChange={e => setImageUrl(e.target.value)} 
                  />
                </div>

                <div>
                  <label style={{ 
                    display: "block", 
                    marginBottom: "0.5rem", 
                    fontSize: "0.85rem", 
                    color: "var(--text-secondary)",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    Price (₹)
                  </label>
                  <input 
                    className="input-field" 
                    type="number" 
                    placeholder="0" 
                    value={price} 
                    onChange={e => setPrice(e.target.value)} 
                  />
                </div>

                <div>
                  <label style={{ 
                    display: "block", 
                    marginBottom: "0.5rem", 
                    fontSize: "0.85rem", 
                    color: "var(--text-secondary)",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    Quantity
                  </label>
                  <input 
                    className="input-field" 
                    type="number" 
                    placeholder="0" 
                    value={quantity} 
                    onChange={e => setQuantity(e.target.value)} 
                  />
                </div>

                <div style={{ gridColumn: "1 / -1", display: "flex", gap: "1rem" }}>
                  <button 
                    className="btn-primary" 
                    onClick={editingId ? updateSweet : createSweet} 
                    style={{ marginTop: "1rem", flex: 1 }}
                  >
                    {editingId ? "Update Product" : "Create Product"}
                  </button>
                  {editingId && (
                    <button 
                      className="btn-secondary" 
                      onClick={resetForm} 
                      style={{ marginTop: "1rem", flex: 1 }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Inventory List */}
          <div>
            <h3 style={{ 
              fontSize: "1.3rem", 
              marginBottom: "2rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
              textAlign: "center"
            }}>
              <i className='bx bx-list-ul' style={{ marginRight: "10px", color: "var(--gold)" }}></i>
              Current Inventory
            </h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {sweets.map((s) => (
                <div key={s._id} style={{ 
                  background: "var(--white)", 
                  border: "2px solid var(--gray-light)",
                  transition: "all 0.3s ease",
                  overflow: "hidden"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "var(--gold)";
                  e.currentTarget.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--gray-light)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                >
                  {/* Product Image */}
                  <div style={{ 
                    height: "150px", 
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
                    <h4 style={{ margin: 0, fontSize: "1.2rem", marginBottom: "0.5rem" }}>{s.name}</h4>
                    <span style={{ 
                      fontSize: "0.75rem", 
                      color: "var(--gold)",
                      textTransform: "uppercase",
                      letterSpacing: "1px"
                    }}>
                      {s.category}
                    </span>
                    
                    <div style={{ 
                      display: "flex", 
                      gap: "1.5rem", 
                      fontSize: "0.9rem",
                      color: "var(--text-secondary)",
                      marginTop: "1rem",
                      paddingTop: "1rem",
                      borderTop: "1px solid var(--gray-light)"
                    }}>
                      <span>
                        Price: <strong style={{ color: "var(--gold)" }}>₹{s.price}</strong>
                      </span>
                      <span>
                        Stock: <strong style={{ color: s.quantity < 10 ? "#ef4444" : "var(--text-primary)" }}>{s.quantity}</strong>
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid var(--gray-light)" }}>
                      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                        <button 
                          className="btn-secondary" 
                          onClick={() => startEdit(s)}
                          style={{ flex: 1, padding: "8px 12px", fontSize: "0.85rem" }}
                        >
                          <i className='bx bx-edit' style={{ fontSize: "1rem" }}></i> Edit
                        </button>
                        <button 
                          className="btn-secondary" 
                          onClick={() => deleteSweet(s._id)}
                          style={{ flex: 1, padding: "8px 12px", fontSize: "0.85rem", borderColor: "#ef4444", color: "#ef4444" }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = "#ef4444";
                            e.currentTarget.style.color = "white";
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#ef4444";
                          }}
                        >
                          <i className='bx bx-trash' style={{ fontSize: "1rem" }}></i> Delete
                        </button>
                      </div>

                      <label style={{ 
                        display: "block", 
                        marginBottom: "0.5rem", 
                        fontSize: "0.8rem", 
                        color: "var(--text-secondary)",
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                      }}>
                        Restock Quantity
                      </label>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <input
                          className="input-field"
                          type="number"
                          placeholder="Qty"
                          style={{ flex: 1 }}
                          value={restockQty[s._id] || ""}
                          onChange={(e) => setRestockQty({ ...restockQty, [s._id]: e.target.value })}
                        />
                        <button 
                          className="btn-secondary" 
                          onClick={() => restockSweet(s._id)}
                          style={{ padding: "10px 20px", flex: "0 0 auto" }}
                        >
                          <i className='bx bx-refresh' style={{ fontSize: "1.2rem" }}></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
