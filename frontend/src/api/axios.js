import axios from "axios";

const api = axios.create({
    baseURL: "https://ai-resume-analyzer-448z.onrender.com",
});

export default api;