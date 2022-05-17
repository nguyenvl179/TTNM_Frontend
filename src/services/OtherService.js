import { axiosInstance } from "./config";

class Other {
  async getPhanBo() {
    return axiosInstance
      .get("/phan-bo/")
      .then((res) => res.data)
      .catch((err) => err.data);
  }

  async getSinhCanh() {
    return axiosInstance
      .get("/sinh-canh/")
      .then((res) => res.data)
      .catch((err) => err.data);
  }

  async getGiaTri() {
    return axiosInstance
      .get("/gia-tri/")
      .then((res) => res.data)
      .catch((err) => err.data);
  }

  async ttMauVat() {
    return axiosInstance
      .get("/tinh-trang-mau-vat/")
      .then((res) => res.data)
      .catch((err) => err.data);
  }

  async ttBaoTon() {
    return axiosInstance
      .get("/tinh-trang-bao-ton/")
      .then((res) => res.data)
      .catch((err) => err.data);
  }
}

export default new Other();
