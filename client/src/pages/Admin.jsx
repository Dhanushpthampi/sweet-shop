import { useEffect, useState } from "react";
import api from "../api/api";

export default function Admin() {
  // create sweet state
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // sweets list
  const [sweets, setSweets] = useState([]);

  // restock inputs per sweet
  const [restockQty, setRestockQty] = useState({});

  // load sweets
  const loadSweets = async () => {
    const res = await api.get("/sweets");
    setSweets(res.data);
  };

  // create sweet
  const createSweet = async () => {
    await api.post("/sweets", {
      name,
      category,
      price: Number(price),
      quantity: Number(quantity),
    });

    alert("Sweet created");

    setName("");
    setCategory("");
    setPrice("");
    setQuantity("");

    loadSweets();
  };

  // restock sweet
  const restockSweet = async (id) => {
    const qty = Number(restockQty[id]);
    if (!qty || qty <= 0) {
      return alert("Enter valid restock quantity");
    }

    await api.post(`/sweets/${id}/restock`, {
      quantity: qty,
    });

    loadSweets();
  };

  useEffect(() => {
    loadSweets();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* CREATE SWEET */}
      <h3>Create Sweet</h3>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
      <input placeholder="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} />
      <input placeholder="Quantity" type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
      <button onClick={createSweet}>Create Sweet</button>

      <hr />

      {/* SWEETS LIST */}
      <h3>Manage Inventory</h3>

      {sweets.map((s) => (
        <div
          key={s._id}
          style={{ border: "1px solid black", padding: 10, marginBottom: 10 }}
        >
          <strong>{s.name}</strong>
          <p>Category: {s.category}</p>
          <p>Price: {s.price}</p>
          <p>Quantity: {s.quantity}</p>

          <input
            type="number"
            placeholder="Restock amount"
            onChange={(e) =>
              setRestockQty({ ...restockQty, [s._id]: e.target.value })
            }
          />
          <button onClick={() => restockSweet(s._id)}>Restock</button>
        </div>
      ))}
    </div>
  );
}
