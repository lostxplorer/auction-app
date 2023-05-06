// Configs
import axios from "axios";
import { endpoints } from "../../api/EndPointes";

class ForgotPasswordApi {
  // register API
  static forgotPasswordPostApi(data, callBack) {
    axios
      .post(`${endpoints().userForgotPasswordAPI}`, data)
      .then((response) => {
        let data = response.data;
        callBack(data);
      })
      .catch((err) => {
        callBack(err.response);
      });
  }
}

export default ForgotPasswordApi;
