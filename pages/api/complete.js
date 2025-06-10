
// pages/api/complete.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  try {
    // 1) forward the POST body to your Apps Script
    const resp = await fetch(process.env.APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock: req.body.stock }),
    });
    const data = await resp.json(); // { success: true }

    // 2) let the front end know
    res.status(200).json(data);
  } catch (err) {
    console.error("POST /api/complete error:", err);
    res.status(500).json({ error: err.message });
  }
}
