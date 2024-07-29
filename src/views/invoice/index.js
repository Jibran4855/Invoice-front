import ReactDOMServer from "react-dom/server";
import { useState, useEffect, useRef } from "react";
import { generateInvoiceHtml } from "./pdf";
import InvoiceModal from "components/Modals/invoiceModal";
// reactstrap components
import { Card, CardHeader, Container, Row, Button } from "reactstrap";

import UserHeader from "components/Headers/UserHeader";
import InvoiceTable from "../../components/tables/invoiceTable";
import { InvoiceServices } from "services/invoice";
import { useDispatch } from "react-redux";
import { setLoader } from "../../store/loader";
import { setError, setSuccess } from "../../store/alert";
import confirm from "reactstrap-confirm";
import moment from "moment";

import { InvoiceGenerator } from '../../helpers/pdf';

const Invoices = () => {
  const containerRef = useRef(null);

  const [invoices, setInvoices] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllInvoices();
  }, []);

  const getAllInvoices = async () => {
    try {
      dispatch(setLoader(true));
      const response = await InvoiceServices.getAllInvoices();
      setInvoices(response.data);
      dispatch(setLoader(false));
    } catch (e) {
      console.log({ e });
      dispatch(setLoader(false));
      dispatch(setError(e.data.error));
    }
  };

  const downloadInvoice = async (id, _data) => {
    try {

      dispatch(setLoader(true));
      setShowInvoice(true);

      const pdfHTML = generateInvoiceHtml(_data);

      setTimeout(async () => {

        if (containerRef.current) {
          containerRef.current.innerHTML = ReactDOMServer.renderToStaticMarkup(pdfHTML);
        }

        const invoiceInstance = new InvoiceGenerator(_data);

        invoiceInstance.generate();

        dispatch(setLoader(false));
      }, 1000);

    } catch (e) {
      console.log({ e });
      dispatch(setLoader(false));
    }

  };

  const downloadExcel = async () => {
    try {
      dispatch(setLoader(true));
      const response = await InvoiceServices.downloadExcel();

      const url = window.URL.createObjectURL(new Blob([response]));

      // Create link element
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-export-${moment().format('DD-MM-YYYY')}.xlsx`; // Set file name

      // Append link to body
      document.body.appendChild(a);

      // Trigger click event on link to initiate download
      a.click();

      // Remove link from body
      document.body.removeChild(a);

      // Revoke URL to release blob
      window.URL.revokeObjectURL(url);
      dispatch(setLoader(false));
    } catch (e) {
      console.log({ e });
      dispatch(setLoader(false));
      dispatch(setError(e.data.error));
    }

  };

  const deleteInvoice = async (id) => {
    try {

      let confirmation = await confirm({
        title: "",
        message:
          "! Are you sure you want to delete this ? Because this action cannot be undone",
        confirmText: "DELETE",
        confirmColor: "danger",
        cancelColor: "link text-primary",
      });

      if (!confirmation) return false;

      dispatch(setLoader(true));

      const response = await InvoiceServices.delete(id);
      dispatch(setSuccess(response.message));
      dispatch(setLoader(false));
      getAllInvoices();
    } catch (e) {
      console.log({ e });
      dispatch(setLoader(false));
      dispatch(setError(e.data.error));
    }
  };


  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="justify-content-between ">
                  <h3 className="mb-0">Invoice List</h3>
                  <Button variant="primary" className="primary-btn" onClick={downloadExcel}>
                    <i class="fas fa-download"></i>
                  </Button>
                </Row>
              </CardHeader>

              <InvoiceTable
                data={invoices}
                openUpdateModal={false}
                deleteService={false}
                download={downloadInvoice}
                delete={deleteInvoice}

              />
            </Card>
          </div>
        </Row>

        <InvoiceModal isOpen={showInvoice} hideModal={() => setShowInvoice(false)}>
          <div ref={containerRef} id="capture-pdf"></div>
        </InvoiceModal>
      </Container>
    </>
  );
};

export default Invoices;
