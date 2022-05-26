import { AuthService } from "../services/auth.service";
import { VaccService } from "../services/vacc.service";
import { useEffect, useState } from "react";
import { NBar } from "./Navbar";
import { VaccList } from "./VaccList";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

/**
 * Funcion que devuelve una lista de los turnos activos de un usuario vacunador
 * @returns Retorna una lista de los turnos activos
 */
const GetAppointments = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState([""]);
  const [usr, setUsr] = useState("");

  //Renderiza "GetAppointments" solo una vez
  useEffect(() => {
    AuthService.getUser().then((res) => {
      if (res) setUsr(res);
      else navigate("/login");
    }, loadAppointments());
  }, []);

  /**
   * Funcion que devuelve todos los turnos de un vacunatorio espeficico
   */
  const loadAppointments = () => {
    VaccService.getAppointments().then(
      ({ appointments }) => {
        setMessage([...appointments]);
      },
      (error) => {
        setMessage(error);
      }
    );
  };

  return (
    <div className="section-container">
      <NBar user={usr} />

      <div className="appointments-container">
        {message.length === 0 && (
          <Card style={{ width: "500px", margin: "10px auto" }}>
            <Card.Body>
              <Card.Text>No existen más turnos para el día de hoy 😊</Card.Text>
            </Card.Body>
          </Card>
        )}
        {message.map((data) => {
          return (
            <VaccList
              loadAppointments={loadAppointments}
              data={data}
              key={Math.floor(Math.random() * (0 - 9999999) + 0)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GetAppointments;
