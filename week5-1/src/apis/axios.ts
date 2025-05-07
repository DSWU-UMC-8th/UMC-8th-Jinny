import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
const parsedToken = token ? JSON.parse(token) : null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    Authorization: parsedToken ? `Bearer ${parsedToken}` : undefined,
  },
});
