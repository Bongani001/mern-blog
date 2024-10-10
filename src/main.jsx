import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { NavbarContextProvider } from "./context/NavbarContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <NavbarContextProvider>
      <App />
    </NavbarContextProvider>
  </AuthContextProvider>
);
