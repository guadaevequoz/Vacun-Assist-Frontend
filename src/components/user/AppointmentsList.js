import React, { useState, useEffect } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Card } from "react-bootstrap";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import getFullDate from "../../helpers/getFullDate";
import { VaccService } from "../../services/vacc.service";
import { GetCertificate } from "./getCertificate";
/**
 * Muesta una lista de los turnos asignados que tiene un usario paciente
 * @param {*} data Es toda la informacion sobre un turno especifico
 * @param {*} key Identificador del turno
 * @returns Retorna una "Card" con la informacion de un turno espeficico
 */
export const AppointmentsList = ({ loadAppointments, data, user }, key) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [changed, setChanged] = useState(false);
  const [messageValue, setMessageValue] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCerrar = () => navigate("/board");

  useEffect(() => {}, [data]);
  const date = data.vaccinationDate
    ? getFullDate(data.vaccinationDate)
    : "A confirmar";

  const cancelAppointment = () => {
    VaccService.cancelAppointment(data._id, data.patientDni).then(
      ({ data }) => {
        console.log(data);
        if (data.status === "fail") {
          setMessageValue(data.message);
          setChanged(true);
        } else {
          setMessageValue("Has cancelado tu turno!");
          setChanged(true);
        }
      }
    );
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
            Estado:
            {data.vaccinationCenter === "Externo"
              ? "Ingresado por el Usuario 👍"
              : data.state === "Finalizado"
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
          {data.vaccine === "FiebreAmarilla" && data.state === "Finalizado" && (
            <PDFDownloadLink
              document={GetCertificate(data, user)}
              fileName="CertificadoFiebreAmarilla"
            >
              <button variant="info">Obtener certificado</button>
            </PDFDownloadLink>
          )}
          {data.state === "Activo" && (
            <button
              className="list-group-item btn btn-danger"
              onClick={handleShow}
            >
              Cancelar turno
            </button>
          )}
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
              {changed && (
                <Button variant="secondary" onClick={handleCerrar}>
                  Cerrar
                </Button>
              )}
              {!changed && (
                <>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button variant="success" onClick={cancelAppointment}>
                    Confirmar
                  </Button>
                </>
              )}
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
      <br />
    </>
  );
};
