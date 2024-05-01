import axios from "axios";

class InvoiceClass {
  getAllInvoices = async () => {
    const API_PATH = `${process.env.REACT_APP_API_URL}/api/invoices`;
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

  getInvoice = async (id) => {
    const API_PATH = `${process.env.REACT_APP_API_URL}/api/invoice/${id}`;
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
    const API_PATH = `${process.env.REACT_APP_API_URL}/api/invoice/create`;
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
    const API_PATH = `${process.env.REACT_APP_API_URL}/api/invoice/delete/${id}`;
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

  downloadPdf = async (id) => {
    const API_PATH = `${process.env.REACT_APP_API_URL}/api/invoice/download/pdf/${id}`;
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

  downloadExcel = async () => {
    const API_PATH = `${process.env.REACT_APP_API_URL}/api/invoice/download/excel`;
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: API_PATH,
        responseType: "blob",
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
    var API_PATH = `${process.env.REACT_APP_API_URL}/api/invoice/update`;
    return new Promise((resolve, reject) => {
      axios({
        method: "PUT",
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
const InvoiceServices = new InvoiceClass();
export { InvoiceServices };
