import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

/**
 * Funcion que muestra la barra de navegacion de un usuario administrador
 * @returns Retorna una barra de navegacion correspondiente a un usuario vacunador
 */
const AdminBoard = () => {
  return (
    <>
      <Nav.Link>
        <Link to={"/getAppointmentsAdmin"} className="nav-link">
          Visualizar turnos
        </Link>
      </Nav.Link>
    </>
  );
};

export default AdminBoard;
