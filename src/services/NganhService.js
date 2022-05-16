import { axiosInstance } from "./config";

class Nganh {
  async getNganh() {
    return await axiosInstance
      .get("/nganh/")
      .then((res) => res.data)
      .catch((err) => err);
  }
  async updateNganh(payload) {
    return axiosInstance
      .put("/nganh/", payload)
      .then((res) => res.status)
      .catch((err) => err.status);
  }
  async createNganh(payload) {
    return await axiosInstance
      .post("/nganh/", payload)
      .then((res) => res.status)
      .catch((err) => err.status);
  }
  async deleteNganh(payload) {
    return await axiosInstance
      .delete("/nganh/", {
        params: {
          id_nganh: payload,
        },
      })
      .then((res) => res.status)
      .catch((err) => err.status);
  }
}
export default new Nganh();
