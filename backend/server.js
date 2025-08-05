const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const generateBooks = require("./utils/bookGenerator");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("📚 Fake Book Generator API is running");
});

app.get("/api/books", (req, res) => {
  const {
    seed,
    region,
    page = 1,
    likes = 0,
    reviews = 0,
    limit = 20,
  } = req.query;

  if (!seed || !region) {
    return res.status(400).json({ error: "Missing required query params: seed or region." });
  }

  try {
    const books = generateBooks({
      seed,
      region,
      page: parseInt(page),
      likes: parseFloat(likes),
      reviews: parseFloat(reviews),
      limit: parseInt(limit),
    });

    res.json(books);
  } catch (err) {
    console.error("Book generation error:", err);
    res.status(500).json({ error: "Failed to generate books." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});