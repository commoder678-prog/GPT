import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const loginUser = (userDetails) =>
  api.post("/api/auth/login", userDetails);

export const registerUser = (userDetails) =>
  api.post("/api/auth/register", userDetails);

export default api