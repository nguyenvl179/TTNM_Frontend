import { axiosInstance } from "./config";

class Gioi {
  async getGioi() {
    return axiosInstance
      .get("/gioi/")
      .then((res) => res.data)
      .catch((err) => err);
  }
  async updateGioi(payload) {
    return await axiosInstance
      .put("/gioi/", payload)
      .then((res) => res.status)
      .catch((err) => err.status);
  }
  async createGioi(payload) {
    return await axiosInstance
      .post("/gioi/", payload)
      .then((res) => res.status)
      .catch((err) => err.status);
  }
  async deleteGioi(payload) {
    return await axiosInstance.delete("/gioi/", {
      params: {
        id_gioi: payload,
      },
    });
  }
}

export default new Gioi();
