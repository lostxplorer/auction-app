// Configs
import axios from "axios";
import { endpoints } from "../../api/EndPointes";

class ResetPasswordApi {
  // register API
  static resetPasswordApi(data, callBack) {
    axios
      .post(`${endpoints().resetPasswordAPI}`, data)
      .then((response) => {
        let data = response.data;
        callBack(data);
      })
      .catch((err) => {
        callBack(err.response);
      });
  }
}

export default ResetPasswordApi;
