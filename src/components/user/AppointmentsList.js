import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Button, Modal } from "react-bootstrap";
import getFullDate from "../../helpers/getFullDate";

/**
 * Muesta una lista de los turnos asignados que tiene un usario paciente
 * @param {*} data Es toda la informacion sobre un turno especifico
 * @param {*} key Identificador del turno
 * @returns Retorna una "Card" con la informacion de un turno espeficico
 */
export const AppointmentsList = ({ loadAppointments, data }, key) => {
  const [show, setShow] = useState(false);
  const [changed, setChanged] = useState(false);
  const [messageValue, setMessageValue] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {}, [data]);
  const date = data.vaccinationDate
    ? getFullDate(data.vaccinationDate)
    : "A confirmar";

  const cancelAppointment = () => {
    setMessageValue("Has cancelado tu turno.");
    setChanged(true);
  };
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
          <button
            className="list-group-item btn btn-danger"
            onClick={handleShow}
          >
            Cancelar turno
          </button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Cancelar turno</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {!changed
                ? `Estas a punto de cancelar tu turno para el día: ${date}`
                : messageValue}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                {!changed ? "Cancelar" : "Cerrar"}
              </Button>
              {!changed && (
                <Button variant="success" onClick={cancelAppointment}>
                  Confirmar
                </Button>
              )}
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
      <br />
    </>
  );
};
