import { Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import AppointmentValidation from "./AppointmentValidation";
import { AuthService } from "../services/auth.service";

/**
 * Funcion que muestra los turnos activos para un vacunatorio especifico
 * @param {*} loadAppointments Funcion que carga los turnos de un vacunatorio especifico
 *  @param {*} data Todos los datos de un turno especifico
 * @param {*} key Identificador de un turno especifico
 * @returns Retorna una "Card" con los datos de un turno y permite validarlo
 */
export const VaccList = ({ loadAppointments, data }, key) => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState("");

  //Renderiza "VaccList" solo una vez
  useEffect(() => {
    AuthService.getUserByDNI(data.patientDni).then((res) => {
      if (res) setUser(res);
    });
  }, []);
  /**
   * Funcion que cierra el "Modal" del componenete "AppointmentValidation"
   */
  const handleClose = () => setShow(false);
  /**
   * Funcion que abre el "Modal" del componenete "AppointmentValidation"
   */
  console.log(user);
  const handleShow = () => setShow(true);
  return (
    <>
      <Card style={{ width: "500px", margin: "10px auto" }}>
        <Card.Header
          style={{
            backgroundColor: `${
              data.vaccine === "Covid"
                ? "#B7E5DD"
                : data.vaccine === "Gripe"
                ? "rgba(188, 250, 92)"
                : "#ffef82"
            }`,
          }}
        >
          <Card.Title>Vacuna: {data.vaccine}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <div key={data._id + data.patientDni}>
              <p>DNI: {data.patientDni}</p>
              <p>Nombre: {user.fullName}</p>
            </div>
          </Card.Text>
        </Card.Body>
        <Button className="validate-window-btn" onClick={handleShow}>
          Validar
        </Button>
        <AppointmentValidation
          loadAppointments={loadAppointments}
          dni={data.patientDni}
          show={show}
          handleClose={handleClose}
          id={data._id}
        />
      </Card>
      <br />
    </>
  );
};
