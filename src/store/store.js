import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loader";
import alertReducer from "./alert";
import authStore from "./auth";

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    alert: alertReducer,
    auth: authStore,
  },
});
