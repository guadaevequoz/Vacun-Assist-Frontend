import { Link } from "react-router-dom";
import { AuthService } from "../services/auth.service";
import UserBoard from "./UserBoard";
import VaccinatorBoard from "./VaccinatorBoard";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav } from "react-bootstrap";

export const NBar = ({ user }) => {
  /*
  const [state, setState] = useState({
    currentUser: "",
    showVaccinator: false,
    showAdmin: false,
  });*/

  const logOut = () => {
    AuthService.logout();
  };

  //SI SACO ESTO FUNCIONA IGUAL, POR LAS DUDAS NO LO SACO DEL TODO
  /*setState({
      currentUser: undefined,
      showVaccinator: false,
      showAdmin: false,
    });
  };
*/

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to={"/board"} className="navbar-brand">
            VacunAssist
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user.rol === "" && (
              <>
                <Nav.Link>
                  <Link to={"/login"} className="nav-link">
                    Iniciar sesión
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to={"/signup"} className="nav-link">
                    Registrarse
                  </Link>
                </Nav.Link>
              </>
            )}
            {user.rol === "admin" && (
              <Nav.Link>
                <Link to={"/getAppointments"} className="nav-link">
                  Listar turnos
                </Link>
              </Nav.Link>
            )}
            {user.rol === "vacc" && (
              <VaccinatorBoard vaccCenter={user.vaccinationCenter} />
            )}
            {user.rol === "user" && <UserBoard user={user} />}
            {user.rol !== "" && (
              <Nav.Link>
                <Link to={"/login"} className="nav-link" onClick={logOut}>
                  Salir
                </Link>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
