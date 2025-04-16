import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { storesContext } from "@/contexts";
import stores from "@/stores";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <storesContext.Provider value={stores}>
      <Router>
        <App />
      </Router>
    </storesContext.Provider>
  </React.StrictMode>,
);
