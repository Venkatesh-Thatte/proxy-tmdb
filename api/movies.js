const fetch = require("node-fetch");

module.exports = async (req, res) => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=4fb874e17eea9e3ab14fc3131a3450e4"
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch TMDB data" });
  }
};
