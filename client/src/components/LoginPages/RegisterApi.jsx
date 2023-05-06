// Configs
import axios from "axios";
import { endpoints } from "../../api/EndPointes";

class RegisterApi {
  // register API
  static registerPostApi(data, callBack) {
    axios
      .post(`${endpoints().userAPI}`, data)
      .then((response) => {
        let data = response.data;
        callBack(data);
      })
      .catch((err) => {
        callBack(err.response);
      });
  }

   // get users API
   static getUsersListApi(callBack, qParam) {
    axios
      .get(`${endpoints().userAPI}?` + qParam)
      .then((response) => {
        let data = response.data;
        callBack(data);
      })
      .catch((err) => {
        callBack(err.response);
      });
  }

  static deleteUserApi(callBack, userId) {
    axios
      .delete(`${endpoints().userAPI}/` + userId)
      .then((response) => {
        let data = response.data;
        callBack(data);
      })
      .catch((err) => {
        callBack(err.response);
      });
  }

  static getUserComplaintList(callBack) {
    axios
      .get(`${endpoints().userComplaintAPI}`)
      .then((response) => {
        let data = response.data;
        console.log('complaintList', data);
        callBack(data);
      })
      .catch((err) => {
        callBack(err.response);
      });
  }
}

export default RegisterApi;
