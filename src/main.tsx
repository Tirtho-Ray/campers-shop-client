import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { ThemeProvider } from "./Theme/ThemeContext";
import '../src/Theme/theme.css';
import { Provider } from "react-redux";
import { store } from "./readux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store} >
    <ThemeProvider>
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
