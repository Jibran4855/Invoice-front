import axios from "axios";

class UserClass {
  getAllUsers = async () => {
    var USER_API_PATH = `${process.env.REACT_APP_API_URL}/api/users`;
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: USER_API_PATH,
        headers: {
          "content-type": "application/json",
          "authorization": "Bearer " + localStorage.getItem("itoken"),
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

  createUser = async (data) => {
    var USER_API_PATH = `${process.env.REACT_APP_API_URL}/api/user/add`;
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: USER_API_PATH,
        data,
        headers: {
          "content-type": "application/json",
          "authorization": "Bearer " + localStorage.getItem("itoken"),
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

  getUserRoles = async () => {
    var API_PATH = `${process.env.REACT_APP_API_URL}/api/roles`;
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: API_PATH,
        headers: {
          "content-type": "application/json",
          "authorization": "Bearer " + localStorage.getItem("itoken"),
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

  deleteUser = async (id) => {
    var API_PATH = `${process.env.REACT_APP_API_URL}/api/user/delete/${id}`;
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

  updateUser = async (data) => {
    var API_PATH = `${process.env.REACT_APP_API_URL}/api/user/update`;
    return new Promise((resolve, reject) => {
      axios({
        method: "put",
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
}

const UserServices = new UserClass();
export { UserServices };
