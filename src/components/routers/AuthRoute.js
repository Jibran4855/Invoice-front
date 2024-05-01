import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUser } from "../../hooks";
import AdminLayout from "layouts/Admin.js";
import { useSelector, useDispatch } from "react-redux";
import Auth from "helpers/auth";
import { userHasAuthenticated, setUser } from "store/auth";

const AuthRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();

  const currentUser = useUser().currentUser;
  const hasAuthorized = useSelector((state) => state.auth.loggedIn)

  if (currentUser && !hasAuthorized) {
    dispatch(userHasAuthenticated(true));
    dispatch(setUser(currentUser));
  }

  return (
    <Route
      {...rest}
      render={routeProps => {
        // if (!currentUser.currentUser.sessionExpire) {
        if (!hasAuthorized) {
          return <Redirect to={"/login"} />
        }
        else {
          return <AdminLayout {...routeProps} />
        }
      }
      }
    />
  );
};

export default AuthRoute;