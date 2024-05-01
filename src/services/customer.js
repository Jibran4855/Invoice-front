import axios from "axios";

class CustomerClass {
  getAllCustomers = async () => {
    const API_PATH = `${process.env.REACT_APP_API_URL}/api/customers`;
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: API_PATH,
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + localStorage.getItem("itoken"),
        },
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((e) => {
          reject(e.response);
        });
    });
  };

  create = async (data) => {
    const API_PATH = `${process.env.REACT_APP_API_URL}/api/customer/create`;
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: API_PATH,
        data,
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + localStorage.getItem("itoken"),
        },
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((e) => {
          reject(e.response);
        });
    });
  };

  delete = async (id) => {
    const API_PATH = `${process.env.REACT_APP_API_URL}/api/customer/delete/${id}`;
    return new Promise((resolve, reject) => {
      axios({
        method: "delete",
        url: API_PATH,
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + localStorage.getItem("itoken"),
        },
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((e) => {
          reject(e.response);
        });
    });
  };

  update = async (data) => {
    var SPECIALIST_API_PATH = `${process.env.REACT_APP_API_URL}/api/customer/update`;
    return new Promise((resolve, reject) => {
      axios({
        method: "put",
        url: SPECIALIST_API_PATH,
        data,
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + localStorage.getItem("itoken"),
        },
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((e) => {
          reject(e.response);
        });
    });
  };
}
const CustomerServices = new CustomerClass();
export { CustomerServices };
