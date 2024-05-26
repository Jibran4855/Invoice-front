import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter , Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "assets/css/invoice.css";

import { QueryClient, QueryClientProvider } from 'react-query'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { AuthProvider } from "./providers";

import AuthRoute from "./components/routers/AuthRoute";
import UnauthRoute from "./components/routers/UnauthRoute";

// import axios from "axios";

import 'react-toastify/dist/ReactToastify.css';

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("itoken");
// axios.defaults.headers.common['content-type'] = "application/json";

const queryClient = new QueryClient()

ReactDOM.render(
  <Provider store={store}>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Switch>
            <UnauthRoute exact path="/login" />
            <AuthRoute exact path="/dashboard" />
            <AuthRoute exact path="/create-invoice" />
            <AuthRoute exact path="/edit-invoice/:id" />
            <AuthRoute exact path="/invoices" />
            <AuthRoute exact path="/products" />
            <AuthRoute exact path="/customers" />
            <AuthRoute exact path="/users" />
            <AuthRoute exact path="/profile" />
            <Redirect from="/" to="/login" />
          </Switch>
        </HashRouter>
      </QueryClientProvider>
    </AuthProvider>
  </Provider>
  ,
  document.getElementById("root")
);
