import { axiosInstance } from "./config";

class Ho {
  getHo() {
    return axiosInstance
      .get("/ho/")
      .then((res) => res.data)
      .catch((err) => err.data);
  }
}

export default new Ho();
