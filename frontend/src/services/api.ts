import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3000"
      : "https://twitterlike-backend.vercel.app",
});


export default api;
