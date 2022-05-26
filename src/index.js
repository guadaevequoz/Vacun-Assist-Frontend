import React from "react";
import ReactDOM from "react-dom/client";
import VacunAssist from "./VacunAssist";
import { BrowserRouter as Router } from "react-router-dom";

/**
 * Javascript principal de la aplicacion
 */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <VacunAssist />
  </Router>
);
