// Automatically detects if a custom URL is set in .env, otherwise defaults to localhost
const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const API_ENDPOINTS = {
  ANALYZE: `${BASE_URL}/api/v1/analyze`,
  HEALTH: `${BASE_URL}/`,
};
