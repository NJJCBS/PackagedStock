// api/inventory.js
export default async function handler(req, res) {
  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyJT539HNbZcMqXVm_lXB1lwD1VyFd-mVG-q_nCZaKOKc4zxn7Y38jg_u1hpu3g7q7n/exec";

  if (req.method === "GET") {
    const resp = await fetch(SCRIPT_URL);
    const data = await resp.json();
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const resp = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });
    const data = await resp.json();
    return res.status(200).json(data);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
