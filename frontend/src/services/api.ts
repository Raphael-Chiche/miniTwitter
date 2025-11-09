import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3000"
      : import.meta.env.VITE_API_URL,
});


export default api;
