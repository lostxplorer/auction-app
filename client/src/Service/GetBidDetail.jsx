import axios from "axios";
import { endpoints } from "../api/EndPointes";

class GetProducts {
  static getBidById(id, callBack) {
    axios
      .get(`${endpoints().productAPI}/${id}`)
      .then((response) => {
        callBack(response.data);
      })
      .catch((err) => {
        callBack(err.response);
      });
  }
}

export default GetProducts;
