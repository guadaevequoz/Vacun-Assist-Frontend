import { Link } from "react-router-dom";
import { AuthService } from "../services/auth.service";
import UserBoard from "./UserBoard";
import VaccinatorBoard from "./VaccinatorBoard";

import { Container, Navbar, Nav } from "react-bootstrap";

/**
 * Funcion que setea la barra de navegacion dependiendo del rol del usuario
 * @param {*} user  Toda la informacion del usuario conectado
 * @returns Retorna una barra de navegacion correspondiente al rol del usuario
 */
export const NBar = ({ user }) => {
  /**
   * Funcion que desconecta a un usuario
   */
  const logOut = () => {
    AuthService.logout();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="nav-bar">
      <Container>
        <Navbar.Brand href="/board">
          <img
            alt=""
            src={require("./valija-transparente-verde.png")}
            width="50"
          ></img>{" "}
          VacunAssist
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
                  Cerrar sesión
                </Link>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
