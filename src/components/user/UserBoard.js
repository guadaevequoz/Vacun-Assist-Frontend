import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

/**
 * Funcion que muestra la barra de navegacion de un usuario paciente
 * @param {*} user Toda la informacion del usuario concetado
 * @returns Retorna una barra de navegacion correspondiente a un usuario paciente
 */
const UserBoard = ({ user }) => {
  return (
    <>
      {user.updatedHealthData && (
        <>
          <Nav.Link>
            <Link to={"/setAppointment"} className="nav-link">
              Sacar turno
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to={"/getAppointments"} className="nav-link">
              Listar turnos
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to={"/appointmentCompleted"} className="nav-link">
              Registrar aplicacion de vacuna
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to={"/updatehealthdata"} className="nav-link">
              Cambiar respuesta de cuestionario de salud
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to={"/getdata"} className="nav-link">
              Mostrar datos
            </Link>
          </Nav.Link>
        </>
      )}
      {!user.updatedHealthData && (
        <Nav.Link>
          <Link to={"/uploadhealthdata"} className="nav-link">
            Cargar datos de salud
          </Link>
        </Nav.Link>
      )}
    </>
  );
};

export default UserBoard;
