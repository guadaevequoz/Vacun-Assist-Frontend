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
        <Link to={"/getStats"} className="nav-link">
          Visualizar estadisticas
        </Link>
      </Nav.Link>
      <Nav.Link>
        <Link to={"/addStock"} className="nav-link">
          Agregar stock
        </Link>
      </Nav.Link>
      <Nav.Link>
        <Link to={"/registerVaccinator"} className="nav-link">
          Registrar vacunador
        </Link>
      </Nav.Link>
      <Nav.Link>
        <Link to={"/addPendingAppointments"} className="nav-link">
          Asignar turnos pendientes
        </Link>
      </Nav.Link>
    </>
  );
};

export default AdminBoard;
