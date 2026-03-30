import axios from "axios";


const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080'
});

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
      window.location.href = "/api/login";
    }
    return Promise.reject(error);
  },
);

// Auth
export const register = (data) => API.post("/api/auth/register", data);
export const login = (data) => API.post("/api/auth/login", data);

// Material
export const uploadText = (data) => API.post("/api/material/text", data);
export const uploadPdf = (formData) => API.post("/api/material/pdf", formData);
export const getMyMaterials = () => API.get("/api/material/my");
export const getMaterial = (id) => API.get(`/api/material/${id}`);

// AI
export const getStudyData = (id) => API.get(`/api/ai/study-data/${id}`);
export const generateSummary = (id) => API.post(`/api/ai/summarize/${id}`);
export const generateMCQ = (id, count, diff) =>
  API.post(`/api/ai/generate-mcq/${id}`, null, {
    params: { count, difficulty: diff },
  });
export const generateFlashcards = (id) =>
  API.post(`/api/ai/generate-flashcards/${id}`);

// Quiz
export const getQuiz = (materialId) => API.get(`/api/quiz/${materialId}`);
export const submitQuiz = (data) => API.post("/api/quiz/submit", data);

// Password Reset
export const forgotPassword = (data) => API.post('/api/auth/forgot-password', data);
export const resetPassword = (data) => API.post('/api/auth/reset-password', data);