import axios from 'axios';

// One axios instance used by the whole app.
// In development "/api" is forwarded to Express by the Vite proxy.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Before every request: if we have a login token, send it to the server
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// After every response: if the server says the token is no good, log out
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes('/auth/login');
    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Link used by the "Download resume" button
export const resumeDownloadUrl = `${api.defaults.baseURL}/resume/download`;

// Turns an axios error into a message we can show on screen
export function getErrorMessage(error) {
  return error.response?.data?.message || 'Could not reach the server. Please try again';
}

export default api;
