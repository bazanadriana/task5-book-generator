const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const generateBooks = require("./utils/bookGenerator");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Fake Book Generator API is running");
});

// GET /api/books
app.get("/api/books", (req, res) => {
  const {
    seed,
    region,
    page = 1,
    likes = 0,
    reviews = 0,
    limit = 20
  } = req.query;

  if (!seed || !region) {
    return res.status(400).json({ error: "Missing seed or region." });
  }

  const books = generateBooks({
    seed,
    region,
    page: parseInt(page),
    likes: parseFloat(likes),
    reviews: parseFloat(reviews),
    limit: parseInt(limit),
  });

  res.json(books);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
