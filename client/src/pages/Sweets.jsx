import { useEffect, useState } from "react";
import api from "../api/api";

export default function Sweets() {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  const loadAll = async () => {
    const res = await api.get("/sweets");
    setSweets(res.data);
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

    const res = await api.get("/sweets/search", { params });
    setSweets(res.data);
  };

  // 🔥 debounce effect
  useEffect(() => {
    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      smartSearch(search);
    }, 500); // wait 500ms after typing stops

    setTypingTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [search]);

  const purchase = async (id) => {
    await api.post(`/sweets/${id}/purchase`);
    loadAll();
  };

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <div>
      <h2>Sweets</h2>

      <input
        placeholder="Search by name, category, price or 10-50"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: 8, width: 300 }}
      />

      <hr />

      {sweets.map((s) => (
        <div
          key={s._id}
          style={{ border: "1px solid black", margin: 8, padding: 8 }}
        >
          <h4>{s.name}</h4>
          <p>Category: {s.category}</p>
          <p>Price: ₹{s.price}</p>
          <p>Quantity: {s.quantity}</p>

          <button
            disabled={s.quantity === 0}
            onClick={() => purchase(s._id)}
          >
            Purchase
          </button>
        </div>
      ))}
    </div>
  );
}