import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth
export const register = (data) => api.post("/api/auth/register", data);
export const login = (data) => api.post("/api/auth/login", data);

// Material
export const uploadText = (data) => api.post("/api/material/text", data);
export const uploadPdf = (formData) => api.post("/api/material/pdf", formData);
export const getMyMaterials = () => api.get("/api/material/my");
export const getMaterial = (id) => api.get(`/api/material/${id}`);

// AI
export const getStudyData = (id) => api.get(`/api/ai/study-data/${id}`);
export const generateSummary = (id) => api.post(`/api/ai/summarize/${id}`);
export const generateMCQ = (id, count, diff) =>
  api.post(`/api/ai/generate-mcq/${id}`, null, {
    params: { count, difficulty: diff },
  });
export const generateFlashcards = (id) =>
  api.post(`/api/ai/generate-flashcards/${id}`);

// Quiz
export const getQuiz = (materialId) => api.get(`/api/quiz/${materialId}`);
export const submitQuiz = (data) => api.post("/api/quiz/submit", data);

// Password Reset
export const forgotPassword = (data) => api.post('/api/auth/forgot-password', data);
export const resetPassword = (data) => api.post('/api/auth/reset-password', data);

// Delete account
export const deleteAccountApi = (data) => api.delete('/api/auth/delete-account', { data });

// Change password
export const changePasswordApi = (data) => api.post('/api/auth/change-password', data);

export default api;