import axios from "axios";
import Cookies from "js-cookie";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export const api = axios.create({ baseURL: API_BASE, withCredentials: true });

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = Cookies.get("admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Redirect to login on 401
api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401 && typeof window !== "undefined") {
      Cookies.remove("admin_token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export const setAuthToken = (token: string) => Cookies.set("admin_token", token, { expires: 1, secure: true, sameSite: "strict" });
export const clearAuthToken = () => Cookies.remove("admin_token");
export const getAuthToken = () => Cookies.get("admin_token");
