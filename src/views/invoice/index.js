import ReactDOMServer from "react-dom/server";
import { useState, useEffect, useRef } from "react";
import { generateInvoiceHtml } from "./pdf";
import jsPDF from 'jspdf';
import { toCanvas } from 'html-to-image';
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

      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.innerHTML = ReactDOMServer.renderToStaticMarkup(pdfHTML);
        }
      }, 1000);

      setTimeout(() => {
        toCanvas(containerRef.current)
          .then((canvas) => {
            const dataUrl = canvas.toDataURL('image/png', 1.0);
            const img = new Image();
            img.crossOrigin = 'annoymous';
            img.src = dataUrl;
            // img.width = 1092;
            img.onload = () => {
              // Initialize the PDF.
              const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: "a4"
                // format: [595, 842]
              });

              // Add the PNG image to the PDF
              // pdf.addImage(dataUrl, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

              // // Define reused data
              const imgProps = pdf.getImageProperties(img);
              const imageType = imgProps.fileType;
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const imgPropsWidth = 800; //imgProps.width;
              // const imgPropsWidth =  imgProps.width;

              // // Calculate the number of pages.
              const pxFullHeight = imgProps.height;
              const pxPageHeight = Math.floor((imgPropsWidth * 8.5) / 5.5);
              const nPages = Math.ceil(pxFullHeight / pxPageHeight);

              // // Define pageHeight separately so it can be trimmed on the final page.
              let pageHeight = pdf.internal.pageSize.getHeight();

              // // Create a one-page canvas to split up the full image.
              const pageCanvas = document.createElement('canvas');
              const pageCtx = pageCanvas.getContext('2d');
              pageCanvas.width = imgPropsWidth;
              pageCanvas.height = pxPageHeight;

              for (let page = 0; page < nPages; page++) {
                // Trim the final page to reduce file size.
                if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
                  pageCanvas.height = pxFullHeight % pxPageHeight;
                  pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
                }
                // Display the page.
                // const w = pageCanvas.width;
                // const h = pageCanvas.height;
                // pageCtx.fillStyle = 'white';
                // pageCtx.fillRect(0, 0, w, h);
                // pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

                // Add the page to the PDF.
                if (page) pdf.addPage();

                // const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
                pdf.addImage(dataUrl, imageType, 0, 0, pdfWidth, pageHeight);
              }
              // Output / Save
              pdf.save(`invoice-${_data.invoiceNumber}.pdf`);
              dispatch(setLoader(false));
            };
          })
      }, 2000);

      // const response = await InvoiceServices.downloadPdf(id, data);
      // const buffer = await response.arrayBuffer();

      // const blob = new Blob([buffer], { type: 'application/pdf' });

      // const url = window.URL.createObjectURL(blob);
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', 'invoice.pdf');
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);

      // // setInvoices(response.data);
      // dispatch(setLoader(false));
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
          "! Are you sure you want to delete this ? Because this action cannot be undone'",
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
          <div style={{ width: "600px" }} ref={containerRef} id="capture"></div>
        </InvoiceModal>
      </Container>
    </>
  );
};

export default Invoices;
