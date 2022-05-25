import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const VaccinatorBoard = (vaccCenter) => {
  /**
   * Pagina de bienvenida del vacunador
   */

  return (
    <>
      <Nav.Link>
        <Link to={"/getAppointmentsVacc"} className="nav-link">
          Visualizar turnos
        </Link>
      </Nav.Link>
    </>
  );
};

export default VaccinatorBoard;
