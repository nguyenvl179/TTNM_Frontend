import axios from "axios";
const access_token = localStorage.getItem("accessToken");
export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
    accept: "*",
  },
});
axiosInstance.defaults.headers.common["Content-Type"] = "Application/json";
