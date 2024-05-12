import { useState, useEffect } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Input,
  Button,
  UncontrolledAlert
} from "reactstrap";

import RightContent from "components/RightContent";
import InvoiceModal from "components/Modals/invoiceModal";
import { setLoader } from "../../store/loader";
import CustomerTable from "components/tables/customerTable";
import Table from "components/Iterate/table.js";
import { useDispatch } from "react-redux";
import { CustomerServices } from "services/customer";
import { ProductServices } from "services/products";
import { InvoiceServices } from "services/invoice";
import { productsCalculation, productPriceSymbol } from "helpers/product";
import { setError, setSuccess } from "../../store/alert";
import Datetime from 'react-datetime';
import moment from "moment";
import { useParams } from 'react-router-dom';

const InvoiceEdit = (props) => {
  const dispatch = useDispatch();

  // Access the id parameter from the URL
  const { id } = useParams();

  const [invoiceData, setInvoiceData] = useState({
    invoiceStatus: "open",
    invoiceType: "invoice",
  });
  const [invoiceCustomerData, setInvoiceCustomerData] = useState({});
  const [invoiceShippingData, setInvoiceShippingData] = useState({});
  const [invoiceProductData, setInvoiceProductData] = useState([]);
  const [invoiceAmountCalc, setInvoiceAmountCalc] = useState({});
  const [resetProducts, setResetProducts] = useState(false);

  const [additionalNote, setAdditionalNote] = useState("");
  const [customeEmail, setCustomeEmail] = useState("");
  const [shippingAmount, setShippingAmount] = useState(0);
  const [isTaxEnable, setIsTaxEnable] = useState(false);

  const [modalType, setModalType] = useState("");
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [isEdit, setIsEdit] = useState(true);

  useEffect(() => {
    getInvoice();
    getAllCustomers();
    getAllProducts();
  }, []);

  useEffect(() => {
    setInvoiceAmountCalc(
      productsCalculation(invoiceProductData, shippingAmount, isTaxEnable)
    );
  }, [invoiceProductData, shippingAmount, isTaxEnable]);

  const getInvoice = async () => {
    try {
      dispatch(setLoader(true));
      const response = await InvoiceServices.getInvoice(id);
      setData(response.data);
      dispatch(setLoader(false));
    } catch (e) {
      console.log({ e });
      dispatch(setLoader(false));
      dispatch(setError(e.data.error));
    }
  };

  const getAllCustomers = async () => {
    try {
      dispatch(setLoader(true));
      const response = await CustomerServices.getAllCustomers();
      setCustomers(response.data);
      dispatch(setLoader(false));
    } catch (e) {
      console.log({ e });
      dispatch(setLoader(false));
      dispatch(setError(e.data.error));
    }
  };

  const getAllProducts = async () => {
    try {
      dispatch(setLoader(true));
      const response = await ProductServices.getAllProducts();
      setProducts(response.data);
      dispatch(setLoader(false));
    } catch (e) {
      console.log({ e });
      dispatch(setLoader(false));
      dispatch(setError(e.data.error));
    }
  };

  const setData = (data) => {
    setInvoiceData({
      invoiceStatus: data.invoiceStatus,
      invoiceType: data.invoiceType,
      dueDate: moment(data.dueDate).format('YYYY-MM-DD'),
      issueDate: moment(data.issueDate).format('YYYY-MM-DD'),
      invoiceNumber: data.invoiceNumber,
    })

    setInvoiceCustomerData(data.customer)
    setInvoiceShippingData(data.customer.shipping)
    setInvoiceAmountCalc(data.total)
    setAdditionalNote(data.additionalNote)
    setShippingAmount(data.shippingAmount)
    setIsTaxEnable(data.isTaxEnable)
    setInvoiceProductData(data.products)
  }

  const updateInvoice = async (data) => {
    try {
      dispatch(setLoader(true));
      const response = await InvoiceServices.update(data);
      setIsEdit(true);
      getInvoice();
      dispatch(setLoader(false));
      dispatch(setSuccess(response.message));
    } catch (e) {
      console.log({ e });
      dispatch(setLoader(false));
      dispatch(setError(e.data.error));
    }
  };

  const handleInvoiceFormChange = (e, type = 'invoice') => {
    const { name, value } = e.target

    if (type === 'invoice') {
      setInvoiceData(prevData => ({
        ...prevData,
        [name]: value
      }))
    }

    if (type === 'customer' || type === 'customerAndShipping') {
      setInvoiceCustomerData(prevData => ({
        ...prevData,
        [name]: value
      }))
    }

    if (type === 'shipping' || type === 'customerAndShipping') {
      setInvoiceShippingData(prevData => ({
        ...prevData,
        [name]: value
      }))
    }

  }

  const handleSelectCustomer = (data) => {
    setInvoiceCustomerData(prevData => ({
      ...prevData,
      ...data
    }))

    setInvoiceShippingData(prevData => ({
      ...prevData,
      ...data.shipping
    }))

    setModalType("")
  }

  const handleUpdateInvoice = () => {

    let data = {
      ...invoiceData,
      customer: { ...invoiceCustomerData, shipping: { ...invoiceShippingData } },
      products: invoiceProductData.filter(obj => obj?.name),
      total: { ...invoiceAmountCalc },
      additionalNote: additionalNote,
      customeEmail: customeEmail,
      shippingAmount: shippingAmount,
      isTaxEnable: isTaxEnable,
      id
    }

    updateInvoice(data);
  }

  return (
    <RightContent title="Edit New Invoice" id='create-invoice-container'>

      <Row>
        <Col lg="4" xl="4"></Col>
        <Col lg="8" xl="8">
          <Row className="mb-2">
            <Col xs="1"></Col>
            <Col xs="3">
              <h2 class="">Select Type:</h2>
            </Col>
            <Col xs="4">
              <select
                class="form-control"
                name="invoiceType"
                value={invoiceData?.invoiceType}
                onChange={handleInvoiceFormChange}
              >
                <option value="invoice" selected>Invoice</option>
                <option value="quote">Quote</option>
                <option value="receipt">Receipt</option>
              </select>
            </Col>
            <Col xs="4">
              <select
                class="form-control"
                name="invoiceStatus"
                value={invoiceData?.invoiceStatus}
                onChange={handleInvoiceFormChange}
              >
                <option value="open" selected>Open</option>
                <option value="paid">Paid</option>
              </select>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs="4">

              <Datetime
                inputProps={{
                  placeholder: 'Issue Date',
                }}
                dateFormat='YYYY-MM-DD'
                timeFormat={false}
                value={invoiceData?.issueDate ?? ""}
                onChange={(e) => {
                  handleInvoiceFormChange({
                    target: {
                      name: "issueDate",
                      value: moment(e._d).format('YYYY-MM-DD')
                    }
                  })
                }}
              />
              {/* <Input
                placeholder="Invoice Date"
                type="date"
                name="issueDate"
                value={invoiceData?.issueDate ?? ""}
                onChange={handleInvoiceFormChange}
              /> */}
            </Col>
            <Col xs="4">
              <Datetime
                inputProps={{
                  placeholder: 'Due Date',
                }}
                dateFormat='YYYY-MM-DD'
                timeFormat={false}
                value={invoiceData?.dueDate ?? ""}
                onChange={(e) => {
                  handleInvoiceFormChange({
                    target: {
                      name: "dueDate",
                      value: moment(e._d).format('YYYY-MM-DD')
                    }
                  })
                }}
              />
              {/* <Input
                placeholder="Invoice Date"
                type="date"
                name="dueDate"
                value={invoiceData?.dueDate ?? ""}
                onChange={handleInvoiceFormChange}
              /> */}
            </Col>
            <Col xs="4">
              <div className="input-group-merge input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    #
                  </span>
                </div>
                <Input
                  className="pl-1"
                  placeholder="Invoice Number"
                  type="text"
                  disabled={true}
                  name="invoiceNumber"
                  value={invoiceData?.invoiceNumber ?? ""}
                  onChange={handleInvoiceFormChange}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col lg="6" xl="6" className="customer-info-box">
          <Card className="shadow">
            <CardHeader className="bg-light">
              <Row className="justify-content-between ">
                <Col lg="6">
                  <h3 className="mb-0">Customer Information</h3>

                </Col>
                <Col lg="6">
                  <h4 className="mb-0 cursor-pointer" onClick={() => { setModalType('customer') }}>
                    <strong>OR </strong>
                    Select Existing Customer
                  </h4>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row>
                <Col className="mb-2" lg="6">
                  <Input
                    className="form-control"
                    placeholder="Enter Name"
                    type="text"
                    name="name"
                    value={invoiceCustomerData?.name ?? ""}
                    onChange={(e) => { handleInvoiceFormChange(e, 'customerAndShipping') }}
                  />
                </Col>
                <Col className="mb-2" lg="6">
                  <div className="input-group-merge input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="fas fa-user"></i>
                      </span>
                    </div>
                    <Input
                      placeholder="E-mail Address"
                      type="email"
                      name="email"
                      value={invoiceCustomerData?.email ?? ""}
                      onChange={(e) => { handleInvoiceFormChange(e, 'customerAndShipping') }}
                    />
                  </div>
                </Col>
                <Col className="mb-2" lg="6">
                  <Input
                    className="form-control"
                    placeholder="Address 1"
                    type="text"
                    name="addressOne"
                    value={invoiceCustomerData?.addressOne ?? ""}
                    onChange={(e) => { handleInvoiceFormChange(e, 'customerAndShipping') }}
                  />
                </Col>
                <Col className="mb-2" lg="6">
                  <Input
                    className="form-control"
                    placeholder="Address 2"
                    type="text"
                    name="addressTwo"
                    value={invoiceCustomerData?.addressTwo ?? ""}
                    onChange={(e) => { handleInvoiceFormChange(e, 'customerAndShipping') }}
                  />
                </Col>
                <Col className="mb-2" lg="6">
                  <Input
                    className="form-control"
                    placeholder="Town"
                    type="text"
                    name="town"
                    value={invoiceCustomerData?.town ?? ""}
                    onChange={(e) => { handleInvoiceFormChange(e, 'customerAndShipping') }}
                  />
                </Col>
                <Col className="mb-2" lg="6">
                  <Input
                    className="form-control"
                    placeholder="Country"
                    type="text"
                    name="country"
                    value={invoiceCustomerData?.country ?? ""}
                    onChange={(e) => { handleInvoiceFormChange(e, 'customerAndShipping') }}
                  />
                </Col>
                <Col className="mb-2" lg="6">
                  <Input
                    className="form-control"
                    placeholder="Postcode"
                    type="text"
                    name="postcode"
                    value={invoiceCustomerData?.postcode ?? ""}
                    onChange={(e) => { handleInvoiceFormChange(e, 'customerAndShipping') }}
                  />
                </Col>
                <Col className="mb-2" lg="6">
                  <Input
                    className="form-control"
                    placeholder="Phone Number"
                    type="text"
                    name="phone"
                    value={invoiceCustomerData?.phone ?? ""}
                    onChange={(e) => { handleInvoiceFormChange(e, 'customerAndShipping') }}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" xl="6" className="shipping-info-box">
          <Card className="shadow">
            <CardHeader className="bg-light">
              <Row className="justify-content-between ">
                <h3 className="mb-0">Shipping Information</h3>
              </Row>
            </CardHeader>
            <CardBody>
              <Row>
                <Col className="mb-2" lg="6">
                  <Input
                    className="form-control"
                    placeholder="Enter Name"
                    type="text"
                    name="name"
                    value={invoiceShippingData?.name ?? ""}
                    onChange={(e) => { handleInvoiceFormChange(e, 'shipping') }}
                  />
                </Col>
                <Col className="mb-2" lg="6">
                  <Input
                    className="form-control"
                    placeholder="Address 1"
                    type="text"
                    name="addressOne"
                    value={invoiceShippingData?.addressOne ?? ""}
                    onChange={(e) => { handleInvoiceFormChange(e, 'shipping') }}
                  />
                </Col>
                <Col className="mb-2" lg="6">
                  <Input
                    className="form-control"
                    placeholder="Address 2"
                    type="text"
                    name="addressTwo"
                    value={invoiceShippingData?.addressTwo ?? ""}
                    onChange={(e) => { handleInvoiceFormChange(e, 'shipping') }}
                  />
                </Col>
                <Col className="mb-2" lg="6">
                  <Input
                    className="form-control"
                    placeholder="Town"
                    type="text"
                    name="town"
                    value={invoiceShippingData?.town ?? ""}
                    onChange={(e) => { handleInvoiceFormChange(e, 'shipping') }}
                  />
                </Col>
                <Col className="mb-2" lg="6">
                  <Input
                    className="form-control"
                    placeholder="Country"
                    type="text"
                    name="country"
                    value={invoiceShippingData?.country ?? ""}
                    onChange={(e) => { handleInvoiceFormChange(e, 'shipping') }}
                  />
                </Col>
                <Col className="mb-2" lg="6">
                  <Input
                    className="form-control"
                    placeholder="Postcode"
                    type="text"
                    name="postcode"
                    value={invoiceShippingData?.postcode ?? ""}
                    onChange={(e) => { handleInvoiceFormChange(e, 'shipping') }}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5 invoice-table-row">
        <Col lg="12">
          <Table
            modalType={modalType}
            products={products}
            setModalType={setModalType}
            setInvoiceProductData={setInvoiceProductData}
            resetProducts={resetProducts}
            setResetProducts={setResetProducts}
            invoiceProductData={invoiceProductData}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        </Col>
      </Row>

      <Row className="mt-5 invoice-totals-row">
        <Col lg="6">
          <Input
            type="textarea"
            placeholder="Additional Notes..."
            value={additionalNote}
            onChange={(e) => setAdditionalNote(e.target.value)}
          />
        </Col>
        <Col lg="6">
          <table className="table">
            <tbody>
              <tr className="text-right">
                <th>Sub Total:</th>
                <td width="150">{invoiceAmountCalc?.subTotal ?? 0}</td>
              </tr>
              <tr className="text-right">
                <th>Discount:</th>
                <td width="150">{invoiceAmountCalc?.discount ?? 0}</td>
              </tr>
              <tr className="text-right">
                <th>Shipping:</th>
                <td width="150">
                  <div className="input-group-merge input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text pt-0 pb-0">
                        {productPriceSymbol()}
                      </span>
                    </div>
                    <Input
                      bsSize="sm"
                      type="number"
                      value={shippingAmount}
                      onChange={(e) => setShippingAmount(e.target.value)}
                    />
                  </div>
                </td>
              </tr>
              <tr className="text-right">
                <th>
                  <div >
                    TAX/VAT:
                  </div>
                  <label for="remove_vat" className="pr-4">Add TAX/VAT</label>
                  <Input
                    type="checkbox"
                    id="remove_vat"
                    checked={isTaxEnable}
                    onChange={(e) => setIsTaxEnable(e.target.checked)}
                  />

                </th>
                <td width="150">{invoiceAmountCalc?.tax ?? 0}</td>
              </tr>
              <tr className="text-right">
                <th>Total:</th>
                <td width="150">{invoiceAmountCalc?.total ?? 0}</td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col lg="12" className="text-right">
          <Button color="success" onClick={handleUpdateInvoice}>
            Update Invoice
          </Button>
        </Col>
      </Row>

      <InvoiceModal
        isOpen={(modalType === 'customer')}
        hideModal={() => setModalType("")}
        title="Select an Existing Customer"
      >

        {
          modalType === 'customer' && <CustomerTable
            data={customers}
            handleSelect={handleSelectCustomer}
            isHandleSelectEnable={true}
          />
        }

      </InvoiceModal>

    </RightContent>

  );
};

export default InvoiceEdit;
