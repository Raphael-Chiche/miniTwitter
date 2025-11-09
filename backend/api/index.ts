import type { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import cors from "cors";
import postsRoutes from "../src/routes/posts.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://mini-twitter-frontend-two.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "🚀 TwitterLike backend is running!" });
});

app.use("/posts", postsRoutes);

// Export pour Vercel
export default (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
};