import { access_token } from "../config/AuthConfig";
import { axiosInstance } from "./config";
import Swal from 'sweetalert2';

class AnimalService {
  async getAllAnimal() {
    return await axiosInstance
      .get("/dong-vat")
      .then((res) => res)
      .catch((err) => err);
  }
  async createAnimal(data) {
    return await axiosInstance
      .post("/dong-vat")
      .then((res) => {
        Swal.fire(
          'Create!',
          'Thêm thành công',
          'success'
        )
      })
      .catch((err) => {
        Swal.fire(
          'Fail!',
          'Thêm thất bại',
          'error'
        )
      });
  }
  async updateAnimal(info) {
    return await axiosInstance
      .put("/dong-vat/", info, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }
  async deleteAnimal(id) {
    return await axiosInstance
      .delete("/dong-vat/", { id_dong_vat: id }, {
        headers: {
          "Content-Type": "application/json",
        },
      })
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
