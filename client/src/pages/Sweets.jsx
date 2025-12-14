import { useEffect, useState } from "react";
import api from "../api/api";

export default function Sweets() {
  const [sweets, setSweets] = useState([]);

  const load = async () => {
    const res = await api.get("/sweets");
    setSweets(res.data);
  };

  const purchase = async (id) => {
    await api.post(`/sweets/${id}/purchase`);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>Sweets</h2>
      {sweets.map(s => (
        <div key={s._id} style={{ border: "1px solid black", margin: 8, padding: 8 }}>
          <h4>{s.name}</h4>
          <p>Category: {s.category}</p>
          <p>Price: {s.price}</p>
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
