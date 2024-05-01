import axios from "axios";

class DashboardClass {
  getAllCount = async () => {
    const API_PATH = `${process.env.REACT_APP_API_URL}/api/dashboard/stats`;
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

  getAllReviewsCount = async () => {
    var REVIEW_API_PATH = `${process.env.REACT_APP_API_URL}/api/review/getVendorReviews`;
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: REVIEW_API_PATH,
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + localStorage.getItem("itoken"),
        },
      })
        .then((res) => {
          resolve(res.data.data.length);
        })
        .catch((e) => {
          reject(e.response);
        });
    });
  };

  getAllServicesCount = async () => {
    var SERVICE_API_PATH = `${process.env.REACT_APP_API_URL}/api/service/getVendorServices`;
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: SERVICE_API_PATH,
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + localStorage.getItem("itoken"),
        },
      })
        .then((res) => {
          resolve(res.data.data.length);
        })
        .catch((e) => {
          reject(e.response);
        });
    });
  };

  getAllSpecialistCount = async () => {
    var SPECIALIST_API_PATH = `${process.env.REACT_APP_API_URL}/api/specialist/getVendorSpecialists`;
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: SPECIALIST_API_PATH,
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + localStorage.getItem("itoken"),
        },
      })
        .then((res) => {
          resolve(res.data.data.length);
        })
        .catch((e) => {
          reject(e.response);
        });
    });
  };
}
const DashboardServices = new DashboardClass();
export { DashboardServices };
