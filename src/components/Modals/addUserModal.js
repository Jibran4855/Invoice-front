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
        setFormData(props.userData);
    }, [props.isOpen]);

    const handleInputChange = (e) => {
        const { name, value, checked, type } = e.target

        setFormData(prevData => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value
        }))

    }

    const handleSubmit = async () => {


        formData?._id ?
            props.onHandleForm('update', formData) : props.onHandleForm('create', formData)

    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <ModalHeader closeButton>
                <h4>{formData?._id ? "EDIT USER" : "ADD NEW USER"}</h4>
            </ModalHeader>
            <ModalBody className="bg-secondary">
                <FormGroup>
                    <label className="form-control-label">
                        Invoice Title
                    </label>
                    <Input
                        type="text"
                        autoComplete="off"
                        className="form-control-alternative"
                        placeholder="Invoice Title"
                        name='invoiceTitle'
                        value={formData?.invoiceTitle}
                        onChange={handleInputChange}
                    />
                </FormGroup>

                <FormGroup>
                    <label className="form-control-label">
                        Full Name
                    </label>
                    <Input
                        type="text"
                        autoComplete="off"
                        className="form-control-alternative"
                        placeholder="Full Name"
                        name='fullname'
                        value={formData?.fullname}
                        onChange={handleInputChange}
                    />
                </FormGroup>

                <FormGroup>
                    <label className="form-control-label">
                        Email
                    </label>
                    <Input
                        type="email"
                        autoComplete="off"
                        className="form-control-alternative"
                        placeholder="Email"
                        name='email'
                        value={formData?.email}
                        onChange={handleInputChange}
                    />
                </FormGroup>

                <FormGroup>
                    <label className="form-control-label">
                        Phone
                    </label>
                    <Input
                        type="number"
                        autoComplete="off"
                        className="form-control-alternative"
                        placeholder="Phone"
                        name='phone'
                        value={formData?.phone}
                        onChange={handleInputChange}
                    />
                </FormGroup>

                <FormGroup>
                    <label className="form-control-label">
                        Gender
                    </label>
                    <Input
                        name="gender"
                        type="select"
                        className="form-control-alternative"
                        placeholder="Gender"
                        value={formData?.gender}
                        onChange={handleInputChange}
                    >
                        <option hidden value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Input>
                </FormGroup>

                <FormGroup>
                    <label className="form-control-label">
                        DOB
                    </label>
                    <Input
                        name="dob"
                        autoComplete="off"
                        placeholder="DOB"
                        type="date"
                        className="form-control-alternative"
                        value={formData?.dob}
                        onChange={handleInputChange}
                    />
                </FormGroup>

                <FormGroup>
                    <label className="form-control-label">
                        Password
                    </label>
                    <Input
                        type="password"
                        autoComplete="off"
                        className="form-control-alternative"
                        placeholder="Password"
                        name='password'
                        value={formData?.password}
                        onChange={handleInputChange}
                    />
                </FormGroup>

                <FormGroup>
                    <label className="form-control-label">
                        Roles
                    </label>
                    <Input
                        name="roleIds"
                        type="select"
                        className="form-control-alternative"
                        value={formData?.roleIds}
                        onChange={handleInputChange}
                    >
                        <option hidden value="">Role</option>
                        {props.allRoles.map(item => {
                            return (<option value={item._id}>{item.role}</option>)
                        })}

                    </Input>
                </FormGroup>


                <div className="d-flex">
                    <span className="mr-2"><b>Active Status</b></span>
                    <label className="custom-toggle custom-toggle-primary">
                        <Input
                            name="isActive"
                            type="checkbox"
                            className="mb-4"
                            checked={formData?.isActive}
                            onChange={handleInputChange}
                        />

                        <span className="custom-toggle-slider rounded-circle" data-label-off="OFF" data-label-on="ON"></span>
                    </label>
                </div>

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

export default function AddUserModal(props) {
    return (
        <>
            <Button
                variant="primary"
                className="primary-btn"
                onClick={() => {
                    props.setUserData({});
                    props.setShowAddModal(true)
                }}
            >
                <i className="fa fa-plus" aria-hidden="true"></i>
            </Button>

            <MyVerticallyCenteredModal
                isOpen={props.showAddModal}
                onHide={() => props.setShowAddModal(false)}
                onHandleForm={(type, data) => props.handleUserCreateAndUpdate(type, data)}
                allRoles={props.allRoles}
                userData={props.userData}
            />
        </>
    );
}
