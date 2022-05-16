import { axiosInstance } from "./config";

class Bo {
  async getBo() {
    return await axiosInstance
      .get("/bo/")
      .then((res) => res.data)
      .catch((err) => err.data);
  }
}
export default new Bo();
