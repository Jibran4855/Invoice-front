import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoader } from "../../store/loader";
import { userHasAuthenticated } from "../../store/auth";
import { setError, setSuccess } from "../../store/alert";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";

import { AuthServices } from "services/auth";

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("vendor@invoice.com");
  const [password, setPassword] = useState("test");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setLoader(true));
    try {
      await AuthServices.login(email, password);
      dispatch(setLoader(false));
      dispatch(userHasAuthenticated(true));
      setTimeout(() => {
        dispatch(setSuccess("Successfully logged in"));
      }, 1000);
    } catch (e) {
      dispatch(setLoader(false));
      dispatch(setError(e?.data?.message));
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0 login-card">
          <CardBody className="px-lg-4 py-lg-4">
            {/* <Container>
              <div className="header-body text-center mb-5">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                    <h1 className="text-white">Welcome!</h1>
                  </Col>
                </Row>
              </div>
            </Container> */}
            <div className="text-center text-muted mb-4 heading-box">
              {/* <h1>
                <i className="ni ni-email-83" />
                Invoice System
              </h1> */}
              <img
                alt="Logo"
                className="navbar-brand-img"
                style={{ maxHeight: "6rem" }}
                src={require("../../assets/img/brand/logo.png").default}
              />
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    onKeyUp={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    onKeyUp={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                  onChange={(e) => { setRememberMe(e.target.checked) }}
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
