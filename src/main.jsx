import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { NavbarContextProvider } from "./context/NavbarContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <NavbarContextProvider>
    <App />
  </NavbarContextProvider>
  // </React.StrictMode>
);
