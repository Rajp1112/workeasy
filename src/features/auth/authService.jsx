const BASE_URL = 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
};

export const registerAPI = async (payload) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Register failed: ${res.statusText}`);
  return res.json();
};

export const loginAPI = async (payload) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.statusText}`);
  return res.json();
};

export const profileAPI = async () => {
  const res = await fetch(`${BASE_URL}/auth/profile`, {
    method: 'GET',
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error(`Profile fetch failed: ${res.statusText}`);
  return res.json();
};
