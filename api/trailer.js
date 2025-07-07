const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const allowedOrigins = [
  "http://localhost:5173",
  "https://movie-app-tau-orcin.vercel.app"
];


  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Preflight response
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing 'id' query param" });
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=4fb874e17eea9e3ab14fc3131a3450e4`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch trailer data" });
  }
};
