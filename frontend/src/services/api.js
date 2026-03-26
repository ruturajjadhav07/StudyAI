import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080/api" });

// Attach JWT token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// Auth
export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);

// Material
export const uploadText = (data) => API.post("/material/text", data);
export const uploadPdf = (formData) => API.post("/material/pdf", formData);
export const getMyMaterials = () => API.get("/material/my");
export const getMaterial = (id) => API.get(`/material/${id}`);

// AI
export const getStudyData = (id) => API.get(`/ai/study-data/${id}`);
export const generateSummary = (id) => API.post(`/ai/summarize/${id}`);
export const generateMCQ = (id, count, diff) =>
  API.post(`/ai/generate-mcq/${id}`, null, {
    params: { count, difficulty: diff },
  });
export const generateFlashcards = (id) =>
  API.post(`/ai/generate-flashcards/${id}`);

// Quiz
export const getQuiz = (materialId) => API.get(`/quiz/${materialId}`);
export const submitQuiz = (data) => API.post("/quiz/submit", data);
