// reactstrap components
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup
} from "reactstrap";

import { useState, useEffect } from "react";

function MyVerticallyCenteredModal(props) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(props.productData);
  }, [props.isOpen]);

  const handleSubmit = async () => {
    // if (!name) {
    //   dispatch(setError("Service Name Required *"));
    //   return false;
    // } else if (!price) {
    //   dispatch(setError("Service Price Required *"));
    //   return false;
    // }

    // const data = {
    //   serviceName: name,
    //   servicePrice: price,
    //   servicePicture: "Dummy",
    // };

    formData?._id ?
      props.onHandleForm('update', formData) : props.onHandleForm('create', formData)
  };

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target

    setFormData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }))

  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalHeader closeButton>
        <h4>{formData?._id ? "EDIT PRODUCT" : "ADD NEW PRODUCT"}</h4>
      </ModalHeader>
      <ModalBody className="bg-secondary">

        <FormGroup>
          <label className="form-control-label">
            Name <span className="text-danger">*</span>
          </label>

          <Input
            type="text"
            id="search-form"
            className="search-input mb-4"
            placeholder="Name"
            name='name'
            value={formData?.name}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <label className="form-control-label">
            Description
          </label>

          <Input
            type="text"
            className="mb-4"
            placeholder="Description"
            name='description'
            value={formData?.description}
            onChange={handleInputChange}
          />
        </FormGroup>


        <FormGroup>
          <label className="form-control-label">
            Price <span className="text-danger">*</span>
          </label>

          <div className="input-group-merge input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fas fa-dollar-sign"></i>
              </span>
            </div>
            <Input
              type="number"
              placeholder="Price"
              name='price'
              value={formData?.price}
              onChange={handleInputChange}
            />
          </div>
        </FormGroup>




      </ModalBody>
      <ModalFooter className="justify-content-between">
        <Button onClick={props.onHide}>Close</Button>
        <Button className="primary-btn" onClick={handleSubmit}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default function AddProductModal(props) {
  return (
    <>
      <Button
        variant="primary"
        className="primary-btn"
        onClick={
          () => {
            props.setProductData({});
            props.setShowAddModal(true)
          }
        }
      >
        <i className="fa fa-plus" aria-hidden="true"></i>
      </Button>

      <MyVerticallyCenteredModal
        isOpen={props.showAddModal}
        onHide={() => props.setShowAddModal(false)}
        onHandleForm={(type, data) => props.handleCreateAndUpdate(type, data)}
        productData={props.productData}
      />
    </>
  );
}
