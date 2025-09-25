// src/api/axiosInstance.js
import axios from 'axios';
import API_BASE_URL from '../apiConfig';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false, // set true only if you actually use httpOnly cookies + proper CORS
  headers: {
    Accept: 'application/json',
    // Do NOT set a global 'Content-Type' — it breaks FormData (multipart)
  },
});

const sanitizeToken = (raw) => {
  if (!raw || typeof raw !== 'string') return null;
  return raw
    .trim()
    .replace(/^"+|"+$/g, '')
    .replace(/^'+|'+$/g, '');
};

axiosInstance.interceptors.request.use((config) => {
  const token = sanitizeToken(localStorage.getItem('token'));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const isFD =
    typeof FormData !== 'undefined' && config.data instanceof FormData;

  if (!isFD && !config.headers['Content-Type']) {
    // For JSON bodies
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    // Optional: handle 401 globally, logout, redirect, etc.
    // if (error?.response?.status === 401) { ... }
    return Promise.reject(error);
  }
);

export default axiosInstance;
