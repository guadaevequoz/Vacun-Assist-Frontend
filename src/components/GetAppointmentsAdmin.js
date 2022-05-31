import { AuthService } from "../services/auth.service";
import { VaccService } from "../services/vacc.service";
import { AppointmentsList } from "./AppointmentsList";
import { useEffect, useState } from "react";
import { NBar } from "./Navbar";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

/**
 * Funcion que muestra en pantalla los turnos de un usuario paciente
 * @returns Retorna una lista con los turnos
 */
const GetAppointmentsAdmin = () => {
  const navigate = useNavigate();
  const [usr, setUsr] = useState("");
  const [message, setMessage] = useState([]);

  //Se renderiza "GetAppointment" solo una vez
  useEffect(() => {
    AuthService.getUser().then((res) => {
      if (res) setUsr(res);
      else navigate("/login");
    });
    VaccService.getAppointments().then(
      ({ appointments }) => {
        setMessage([...appointments]);
      },
      (error) => {
        setMessage(error);
      },
      AuthService.getUser().then((res) => {
        if (res) setUsr(res);
        else navigate("/login");
      })
    );
  }, []);
  return (
    <>
      <div className="section-container">
        <NBar user={usr} />
        <div className="appointments-container">
          <Card style={{ width: "500px", margin: "10px auto" }}>
            <Card.Body>
              <Card.Text>
                Próximamente vas a poder visualizar todas las estadísticas
                relevantes como administrador.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default GetAppointmentsAdmin;
