import type { Request, Response } from "express";
import { db } from "../db/clients.ts";
import { posts } from "../db/schema.ts";
import { eq } from "drizzle-orm";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const allPosts = await db.select().from(posts).orderBy(posts.id);
    res.json(allPosts);
  } catch (err) {
    res.status(500).json({ error: "Error fetching posts" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { content, authorId } = req.body;

  if (!content || !authorId)
    return res.status(400).json({ error: "Missing content or authorId" });

  try {
    const result = await db.insert(posts).values({ content, authorId }).returning();
    res.status(201).json(result[0]);
  } catch (err) {
    res.status(500).json({ error: "Error creating post" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

  try {
    await db.delete(posts).where(eq(posts.id, id));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error deleting post" });
  }
};
