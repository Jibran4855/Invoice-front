// reactstrap components
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  FormGroup
} from "reactstrap";

import { useState, useEffect } from "react";

function MyVerticallyCenteredModal(props) {
  const [customerFormData, setCustomerFormData] = useState({});
  const [shippingFormData, setShippingFormData] = useState({});

  useEffect(() => {

    if (props.customerData?._id) {
      setCustomerFormData(props?.customerData);
      setShippingFormData(props?.customerData?.shipping);
    } else {
      setCustomerFormData({})
      setShippingFormData({})
    }

  }, [props.isOpen]);

  const handleInputCustomerChange = (e) => {
    const { name, value } = e.target

    setCustomerFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleInputShippingChange = (e) => {
    const { name, value } = e.target

    setShippingFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async () => {

    let data = {
      ...customerFormData,
      shipping: { ...shippingFormData }
    }

    data?._id ?
      props.onHandleForm('update', data) : props.onHandleForm('create', data)
  };


  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalHeader closeButton>
        <h4>ADD NEW CUSTOMER</h4>
      </ModalHeader>
      <ModalBody className="pt-0">
        <Row>
          <Col lg="6" xl="6" className="customer-info-box">
            <Card className="shadow">
              <CardHeader className="bg-light">
                <Row className="justify-content-between ">
                  <h3 className="mb-0">Customer Information</h3>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="mb-2" lg="6">

                    <FormGroup className=" p-0 m-0">
                      <label className="form-control-label">
                        Name
                      </label>
                      <Input
                        placeholder="Name"
                        type="text"
                        name="name"
                        value={customerFormData?.name}
                        onChange={handleInputCustomerChange}
                      />
                    </FormGroup>

                  </Col>
                  <Col className="mb-2" lg="6">
                    <FormGroup className=" p-0 m-0">
                      <label className="form-control-label">
                        E-mail Address
                      </label>
                      <div className="input-group-merge input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="fas fa-envelope"></i>
                          </span>
                        </div>
                        <Input
                          placeholder="E-mail Address"
                          type="email"
                          name="email"
                          value={customerFormData?.email}
                          onChange={handleInputCustomerChange}
                        />
                      </div>
                    </FormGroup>

                  </Col>
                  <Col className="mb-2" lg="6">
                    <FormGroup className=" p-0 m-0">
                      <label className="form-control-label">
                        Address 1
                      </label>
                      <Input
                        className="form-control"
                        placeholder="Address 1"
                        type="text"
                        name="addressOne"
                        value={customerFormData?.addressOne}
                        onChange={handleInputCustomerChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="mb-2" lg="6">
                    <FormGroup className=" p-0 m-0">
                      <label className="form-control-label">
                        Address 2
                      </label>
                      <Input
                        className="form-control"
                        placeholder="Address 2"
                        type="text"
                        name="addressTwo"
                        value={customerFormData?.addressTwo}
                        onChange={handleInputCustomerChange}
                      />
                    </FormGroup>

                  </Col>
                  <Col className="mb-2" lg="6">
                    <FormGroup className=" p-0 m-0">
                      <label className="form-control-label">
                        Town
                      </label>
                      <Input
                        className="form-control"
                        placeholder="Town"
                        type="text"
                        name="town"
                        value={customerFormData?.town}
                        onChange={handleInputCustomerChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="mb-2" lg="6">
                    <FormGroup className=" p-0 m-0">
                      <label className="form-control-label">
                        Country
                      </label>
                      <Input
                        className="form-control"
                        placeholder="Country"
                        type="text"
                        name="country"
                        value={customerFormData?.country}
                        onChange={handleInputCustomerChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="mb-2" lg="6">
                    <FormGroup className=" p-0 m-0">
                      <label className="form-control-label">
                        Postcode
                      </label>
                      <Input
                        className="form-control"
                        placeholder="Postcode"
                        type="text"
                        name="postcode"
                        value={customerFormData?.postcode}
                        onChange={handleInputCustomerChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="mb-2" lg="6">
                    <FormGroup className=" p-0 m-0">
                      <label className="form-control-label">
                        Phone Number
                      </label>
                      <Input
                        className="form-control"
                        placeholder="Phone Number"
                        type="number"
                        name="phone"
                        value={customerFormData?.phone}
                        onChange={handleInputCustomerChange}
                      />
                    </FormGroup>

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
                    <FormGroup className=" p-0 m-0">
                      <label className="form-control-label">
                        Enter Name
                      </label>
                      <Input
                        className="form-control"
                        placeholder="Enter Name"
                        type="text"
                        name="name"
                        value={shippingFormData?.name}
                        onChange={handleInputShippingChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="mb-2" lg="6">
                    <FormGroup className=" p-0 m-0">
                      <label className="form-control-label">
                        Address 1
                      </label>
                      <Input
                        className="form-control"
                        placeholder="Address 1"
                        type="text"
                        name="addressOne"
                        value={shippingFormData?.addressOne}
                        onChange={handleInputShippingChange}
                      />
                    </FormGroup>

                  </Col>
                  <Col className="mb-2" lg="6">
                    <FormGroup className=" p-0 m-0">
                      <label className="form-control-label">
                        Address 2
                      </label>
                      <Input
                        className="form-control"
                        placeholder="Address 2"
                        type="text"
                        name="addressTwo"
                        value={shippingFormData?.addressTwo}
                        onChange={handleInputShippingChange}
                      />
                    </FormGroup>

                  </Col>
                  <Col className="mb-2" lg="6">
                    <FormGroup className=" p-0 m-0">
                      <label className="form-control-label">
                        Town
                      </label>
                      <Input
                        className="form-control"
                        placeholder="Town"
                        type="text"
                        name="town"
                        value={shippingFormData?.town}
                        onChange={handleInputShippingChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="mb-2" lg="6">
                    <FormGroup className=" p-0 m-0">
                      <label className="form-control-label">
                        Country
                      </label>
                      <Input
                        className="form-control"
                        placeholder="Country"
                        type="text"
                        name="country"
                        value={shippingFormData?.country}
                        onChange={handleInputShippingChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="mb-2" lg="6">
                    <FormGroup className=" p-0 m-0">
                      <label className="form-control-label">
                        Postcode
                      </label>
                      <Input
                        className="form-control"
                        placeholder="Postcode"
                        type="text"
                        name="postcode"
                        value={shippingFormData?.postcode}
                        onChange={handleInputShippingChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </ModalBody>
      <ModalFooter className="justify-content-between">
        <Button onClick={props.onHide}>Close</Button>
        <Button
          className="primary-btn"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default function AddCustomerModal(props) {
  return (
    <>
      <Button
        variant="primary"
        className="primary-btn"
        onClick={() => props.setShowAddModal(true)}
      >
        <i className="fa fa-plus" aria-hidden="true"></i>
      </Button>

      <MyVerticallyCenteredModal
        {...props}
        isOpen={props.showAddModal}
        onHide={() => props.setShowAddModal(false)}
        onHandleForm={(type, data) => props.handleCreateAndUpdate(type, data)}
        customerData={props.customerData}
      />
    </>
  );
}
