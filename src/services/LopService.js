import { axiosInstance } from "./config";

class Lop {
  async getLop() {
    return await axiosInstance
      .get("/lop/")
      .then((res) => res.data)
      .catch((err) => err);
  }
  async createLop(payload) {
    return await axiosInstance
      .post("/lop/", payload)
      .then((res) => res.status)
      .catch((err) => err.status);
  }
  async updateLop(payload) {
    return await axiosInstance
      .put("/lop/", payload)
      .then((res) => res.status)
      .catch((err) => err.status);
  }
  async deleteLop(payload) {
    return await axiosInstance
      .delete("/gioi/", {
        params: {
          id_lop: payload,
        },
      })
      .then((res) => res.status)
      .catch((err) => err.status);
  }
}
export default new Lop();
