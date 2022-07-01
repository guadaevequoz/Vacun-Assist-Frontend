import { AuthService } from "../../services/auth.service";
import { VaccService } from "../../services/vacc.service";
import { AppointmentsList } from "./AppointmentsList";
import { useEffect, useState } from "react";
import { NBar } from "../Navbar";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

/**
 * Funcion que muestra en pantalla los turnos de un usuario paciente
 * @returns Retorna una lista con los turnos
 */
const GetAppointments = () => {
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

  /**
   * Funcion que devuelve todos los turnos ACTIVOS de un vacunatorio espeficico
   */
  const loadAppointments = () => {
    VaccService.getAppointments().then(
      ({ appointments }) => {
        let array = [];
        appointments.map((data) => {
          if (data.state === "Activo") array = [...array, data];
        });
        setMessage(array);
      },
      (error) => {
        setMessage(error);
      }
    );
  };
  return (
    <>
      <div className="section-container">
        <NBar user={usr} />
        <div className="appointments-container">
          {message.length === 0 && (
            <Card style={{ width: "500px", margin: "10px auto" }}>
              <Card.Body>
                <Card.Text>
                  Aún no tenes turnos vinculados, pero no te desanimes! Ingresa
                  a la sección "Sacar turno" para solicitarlo, si no hay
                  disponibles te notificaremos cuando haya uno 😊
                </Card.Text>
              </Card.Body>
            </Card>
          )}
          {message.map((data, idx) => {
            return (
              <AppointmentsList
                loadAppointments={loadAppointments}
                data={data}
                user={usr}
                key={Math.floor(Math.random() * (0 - 9999999) + 0)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default GetAppointments;
