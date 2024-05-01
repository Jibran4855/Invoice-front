// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

import UserHeader from "components/Headers/UserHeader";
import { useState, useEffect } from "react";
import { ProfileServices } from "services/profile";
import { setError, setSuccess } from "store/alert";

import { useDispatch } from "react-redux";
import { setLoader } from "store/loader";
import { useUser } from "../../hooks";

const VenderProfile = (props) => {
  const dispatch = useDispatch();

  const useUserInstance = useUser();
  const currentUser = useUserInstance.currentUser;

  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData(currentUser)
  }, [currentUser]);

  const updateProfile = async () => {
    try {
      dispatch(setLoader(true));
      const respose = await ProfileServices.updateProfile(userData);
      dispatch(setSuccess(respose.message));
      dispatch(setLoader(false));
      useUserInstance.refreshUser(true)
    } catch (e) {
      dispatch(setLoader(false));
      dispatch(setError(e.data.error));
      console.log({ e });
    }
  };

  const handleUserFormChange = (e) => {
    const { name, value } = e.target

    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My Account</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    General Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Invoice Title
                          </label>
                          <Input
                            className="form-control-alternative"
                            placeholder="Invoice Title"
                            type="text"
                            name="invoiceTitle"
                            disabled={true}
                            defaultValue={userData?.invoiceTitle}
                            onChange={handleUserFormChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Display Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            placeholder="Username"
                            type="text"
                            name="fullname"
                            defaultValue={userData?.fullname}
                            onChange={handleUserFormChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            placeholder="jesse@example.com"
                            type="email"
                            disabled={true}
                            name="email"
                            defaultValue={userData?.email}
                            onChange={handleUserFormChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Contact
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="Contact"
                            type="text"
                            name="phone"
                            defaultValue={userData?.phone}
                            onChange={handleUserFormChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Date Of Birth
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            type="date"
                            name="dob"
                            defaultValue={userData?.dob}
                            onChange={handleUserFormChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Gender
                          </label>

                          <Input
                            type="select"
                            className="form-control-alternative"
                            name="gender"
                            value={userData?.gender}
                            onChange={handleUserFormChange}
                          >
                            <option value="male">
                              Male
                            </option>
                            <option value="female">
                              Female
                            </option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />

                  <h6 className="heading-small text-muted mb-4">
                    Security
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Old Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            placeholder="Old Password"
                            type="password"
                            name="oldPassword"
                            defaultValue={userData?.oldPassword ?? ""}
                            onChange={handleUserFormChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            New Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            placeholder="New Password"
                            type="password"
                            name="password"
                            defaultValue={userData?.password ?? ""}
                            onChange={handleUserFormChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Confirm Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            placeholder="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            defaultValue={userData?.confirmPassword ?? ""}
                            onChange={handleUserFormChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <div className="text-center">
                    <Button variant="primary" className="primary-btn" onClick={updateProfile}>
                      UPDATE
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default VenderProfile;
