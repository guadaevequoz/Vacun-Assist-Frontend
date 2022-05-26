import { AuthService } from "../services/auth.service";
import { VaccService } from "../services/vacc.service";
import { AppointmentsList } from "./AppointmentsList";
import { useEffect, useState } from "react";
import { NBar } from "./Navbar";
import { useNavigate } from "react-router-dom";

/**
 * Funcion que muestra en pantalla los turnos de un usuario paciente
 * @returns Retorna una lista con los turnos
 */
const GetAppointments = () => {
  const navigate = useNavigate();
  const [usr, setUsr] = useState("");
  const [message, setMessage] = useState([""]);

  //Se renderiza "GetAppointment" solo una vez
  useEffect(() => {
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
      {!message && (
        <p>
          Aún no tenes turnos vinculados, pero no te desanimes! Ingresa a la
          sección "Sacar turno" para solicitarlo, si no hay disponibles te
          notificaremos cuando haya uno 😊
        </p>
      )}
      <div className="section-container">
        <NBar user={usr} />
        <div className="appointments-container">
          {message.map((data, idx) => {
            return (
              <AppointmentsList
                data={data}
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
