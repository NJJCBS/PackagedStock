
// pages/index.js
import { useState, useEffect } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [tab, setTab]       = useState("");
  const [stock, setStock]   = useState([]);

  // on-load: fetch beer names
  useEffect(() => {
    fetch("/api/getStock")
      .then(r => r.json())
      .then(d => {
        setTab(d.tab);
        setStock(d.stock);
        setLoading(false);
      });
  }, []);

  const updateQty = (i, v) => {
    const s = [...stock];
    s[i].quantity = v;
    setStock(s);
  };
  const clearQty = (i) => updateQty(i, "");

  const complete = async () => {
    const res = await fetch("/api/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock }),
    });
    alert(res.ok ? "✅ Saved!" : "❌ Error");
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>📋 Stocktake (tab: {tab})</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {stock.map((b, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              margin: "8px 0",
            }}
          >
            <span style={{ flex: 1 }}>{b.name}</span>
            <input
              type="number"
              value={b.quantity}
              onChange={(e) => updateQty(i, e.target.value)}
              style={{ width: 60, marginRight: 8 }}
            />
            <button onClick={() => clearQty(i)}>🗑️</button>
          </li>
        ))}
      </ul>
      <button
        onClick={complete}
        style={{ marginTop: 16, padding: "8px 16px" }}
      >
        Complete
      </button>
    </div>
  );
}
