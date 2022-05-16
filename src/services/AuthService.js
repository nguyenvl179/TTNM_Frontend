import axios from "axios";
import { axiosInstance } from "./config";

class Auth {
  async login(payload) {
    return await axiosInstance
      .post("/user/login-form", payload)
      .then((res) => localStorage.setItem("accessToken", res.data))
      .then(() => (window.location = "/adminstrator/animals"))
      .catch((err) => err.status);
  }
  logout() {
    localStorage.removeItem("accessToken");
    window.location.reload();
  }
}
export default new Auth();
