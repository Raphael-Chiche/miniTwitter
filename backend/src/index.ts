import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import postsRoutes from "./routes/posts.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173", 
    "https://mini-twitter-frontend-two.vercel.app", 
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "🚀 TwitterLike backend is running!" });
});

// 👇 Ajoute ceci
app.use("/posts", postsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

app.use(cors({
  origin: "http://localhost:5173", // l’adresse du front (Vite)
  credentials: true,
}));
