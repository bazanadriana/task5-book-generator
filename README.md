# 📚 Task 5 – Fake Book Generator

This is a single-page web app for generating **language-aware, seed-based fake book data** for testing bookstore applications. It uses **server-side deterministic generation** (no database) and supports infinite scrolling, input customization, and expandable rows.

---

## ✨ Features

- 🌐 Select language & region (e.g. English, French, German, Japanese)
- 🔢 Provide a numeric seed for repeatable/deterministic data generation
- 💖 Set average number of likes per book (0–10, fractional)
- ✍️ Set average number of reviews per book (fractional, e.g. 3.4)
- 📚 Infinite scrolling with lazy data loading (no reloading previous pages)
- 📈 Expandable table rows to view random review and cover
- 🧠 Server-side data generation with no database or persistence
- 🧪 Fully deterministic: same seed + inputs = same results

---

## 🧩 Tech Stack

- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Node.js, Express
- **Data Generation**: `@faker-js/faker`, `seedrandom`
- **Infinite Scroll**: `react-infinite-scroll-component`

---

## 🚀 Getting Started

🚀 Run the App
Backend
cd backend
npm install
node server.js

Frontend
cd frontend
npm install
npm start

### 1. Clone the repository

👤 Author
Adriana Bazan
GitHub: @bazanadriana

📜 License
This project is part of a school assignment and provided for educational purposes only.