// pages/api/getStock.js
export default async function handler(req, res) {
  try {
    // 1) call your Apps Script GET endpoint
    const resp = await fetch(process.env.APPS_SCRIPT_URL);
    const data = await resp.json(); // { tab: "...", stock: [ { name, quantity } ] }

    // 2) forward it to the front end
    res.status(200).json(data);
  } catch (err) {
    console.error("GET /api/getStock error:", err);
    res.status(500).json({ error: err.message });
  }
}

