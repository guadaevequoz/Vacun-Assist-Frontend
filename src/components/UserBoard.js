import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

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
