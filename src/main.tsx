import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { StorefrontProvider } from "./storefront/storefront-context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StorefrontProvider>
      <App />
    </StorefrontProvider>
  </React.StrictMode>,
);
