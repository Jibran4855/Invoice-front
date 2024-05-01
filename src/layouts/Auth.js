import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import routes from "routes.js";

import { ToastContainer, toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux'

import Loader from 'components/Loader/Loader'

import { setAlertDefault } from '../store/alert'

const Auth = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const isLoading = useSelector((state) => state.loader.loading)
  const isError = useSelector((state) => state.alert.error)
  const isSuccess = useSelector((state) => state.alert.success)
  const alertMessage = useSelector((state) => state.alert.message)
  const dispatch = useDispatch()


  React.useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  isError && toast.error(alertMessage, {
    draggable: true,
    theme: 'dark'
  })
  
  isSuccess && toast.success(alertMessage, {
    autoClose: 2000,
    draggable: true,
    theme:'dark'
  })

  if (isError || isSuccess) {
    dispatch(setAlertDefault())
  }

  return (
    <>
      <Loader isVisible={isLoading} />
      <ToastContainer />

      <div className="custom-bg-gradient-dark">
        <div className="main-content " ref={mainContent}>
          {/* <AuthNavbar /> */}
          <div className="header py-7 py-lg-8">
            {/* <Container>
              <div className="header-body text-center mb-5">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                    <h1 className="text-white">Welcome!</h1>
                  </Col>
                </Row>
              </div>
            </Container> */}
          </div>
          {/* Page content */}
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
              <Switch>
                {getRoutes(routes)}
                <Redirect from="*" to="/auth/login" />
              </Switch>
            </Row>
          </Container>
        </div>
        <AuthFooter />
      </div>

    </>
  );
};

export default Auth;
