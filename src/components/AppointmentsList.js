import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import getFullDate from "../helpers/getFullDate";
import AppointmentCompleted from "./AppointmentCompleted";

/**
 * Muesta una lista de los turnos asignados que tiene un usario paciente
 * @param {*} data Es toda la informacion sobre un turno especifico
 * @param {*} key Identificador del turno
 * @returns Retorna una "Card" con la informacion de un turno espeficico
 */
export const AppointmentsList = ({ loadAppointments, data }, key) => {
  const [show, setShow] = useState(false);
  useEffect(() => {}, [data]);
  const date = data.vaccinationDate
    ? getFullDate(data.vaccinationDate)
    : "A confirmar";

  /**
   * Funcion que cierra el "Modal" del componenete "AppointmentValidation"
   */
  const handleClose = () => setShow(false);

  /**
   * Funcion que abre el "Modal" del componenete "AppointmentValidation"
   */
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
          <div className="list-group-item"> Día: {date}</div>
          <div className="list-group-item">
            Estado:{" "}
            {data.state === "Finalizado"
              ? "Turno concretado ✅"
              : data.state === "Activo"
              ? "Turno pendiente ⌛"
              : data.state === "Pendiente"
              ? "En espera ⛔"
              : "Turno cancelado ❌"}
          </div>
          <div className="list-group-item">
            Vacunatorio: {data.vaccinationCenter}
          </div>
        </Card.Body>
        <AppointmentCompleted
          show={show}
          handleClose={handleClose}
          loadAppointments={loadAppointments}
          vaccine={data.vaccine}
        />
      </Card>
      <br />
    </>
  );
};
