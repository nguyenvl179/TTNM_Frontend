import { access_token } from "../config/AuthConfig";
import { axiosInstance } from "./config";

class AnimalService {
  async getAllAnimal() {
    return await axiosInstance
      .get("/dong-vat")
      .then((res) => res)
      .catch((err) => err);
  }
  async getDetailAnimal(id) {
    return await axiosInstance
      .get(`/dong-vat/get-detail/${id}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
  async filterAnimal(payload) {
    return await axiosInstance
      .post("/dong-vat/filter/", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
  async readFile(file) {
    const formData = new FormData();
    formData.append("_in", file[0], file[0].name);
    return await axiosInstance
      .post("/file/", formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => res.status)
      .catch((err) => err.status);
  }
}

export default new AnimalService();
