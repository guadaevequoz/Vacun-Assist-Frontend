import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

/**
 * Funcion que muestra la barra de navegacion de un usuario vacunador
 * @returns Retorna una barra de navegacion correspondiente a un usuario vacunador
 */
const VaccinatorBoard = () => {
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
