import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

import { ToastContainer, toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";

import Loader from "components/Loader/Loader";

import { setAlertDefault } from "../store/alert";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const isLoading = useSelector((state) => state.loader.loading);
  const isError = useSelector((state) => state.alert.error);
  const isSuccess = useSelector((state) => state.alert.success);
  const alertMessage = useSelector((state) => state.alert.message);
  const dispatch = useDispatch();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {

        if (prop?.collapse) {
          return prop?.collapse?.map((item, index) => (
            <Route path={item.path} component={item.component} key={index + key} />
          ))
        }

        return <Route path={prop.path} component={prop.component} key={key} />;
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  isError &&
    toast.error(alertMessage, {
      draggable: true,
      theme: "dark",
    });

  isSuccess &&
    toast.success(alertMessage, {
      draggable: true,
      theme: "dark",
    });

  if (isError || isSuccess) {
    dispatch(setAlertDefault());
  }

  return (
    <>
      <Loader isVisible={isLoading} />
      <ToastContainer />

      <Sidebar
        {...props}
        routes={routes}
        // logo={{
        //   innerLink: "/admin/index",
        //   imgSrc: require("../assets/img/brand/booky_logo.png").default,
        //   imgAlt: "...",
        // }}
        title="Invoice"
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>
          {getRoutes(routes)}
          {/* <Redirect from="*" to="/admin/index" /> */}
        </Switch>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
