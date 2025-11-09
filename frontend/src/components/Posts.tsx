import { useEffect, useState } from "react";
import api from "../services/api";

interface Post {
  id: number;
  content: string;
  authorId: number;
  createdAt: string;
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await api.get("/posts");
    setPosts(res.data);
  };

  const handleCreatePost = async () => {
    if (!newPost.trim()) return;

    await api.post("/posts", {
      content: newPost,
      authorId: 1, // temporaire (avant l’auth)
    });

    setNewPost("");
    fetchPosts(); // recharger la liste
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/posts/${id}`);
    fetchPosts();
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>🕊️ TwitterLike</h1>

      <div style={{ marginBottom: 20 }}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Quoi de neuf ?"
          style={{ width: "100%", padding: 10, height: 80 }}
        />
        <button onClick={handleCreatePost} style={{ marginTop: 10 }}>
          Publier
        </button>
      </div>

      <ul>
        {posts.map((p) => (
          <li key={p.id} style={{ marginBottom: 10 }}>
            <p>{p.content}</p>
            <small>Posté le {new Date(p.createdAt).toLocaleString()}</small>
            <br />
            <button onClick={() => handleDelete(p.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
