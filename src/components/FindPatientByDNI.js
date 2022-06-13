import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { VaccService } from "../services/vacc.service";
import { AuthService } from "../services/auth.service";

const FindPatientByDNI = ({
  show,
  handleClose,
  dni,
  vaccinationCenter,
  loadAppointments,
}) => {
  const [fullName, setFullName] = useState("");
  const [DNI, setDNI] = useState("");
  const [appointments, setAppointments] = useState([]);

  //Cambiar esto cuando getAppointmentsByDNI devuelva tambien la info del usuario
  useEffect(() => {
    if (dni) {
      setDNI(dni);
      VaccService.getAppointmentsByDNI(dni).then((res) => {
        console.log(res);
        let array = res.filter(
          (data) =>
            data.vaccinationCenter === vaccinationCenter &&
            data.state === "Activo"
        );
        setAppointments(array);
      });
      AuthService.getUserByDNI(dni).then((data) => {
        setFullName(data.fullName);
      });
    }
  }, [dni]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    loadAppointments(appointments);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>Compruebe que los datos sean correctos:</Modal.Header>
        <Modal.Body>
          <ul>
            <li>Nombre Completo: {fullName}</li>
            <li>DNI:{DNI}</li>
          </ul>
          {appointments.length === 0 ? (
            <div>No tiene turnos activos</div>
          ) : (
            <div>Tiene turnos activos. Se veran a continuacion.</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-validate" type="submit" onClick={handleSubmit}>
            Ok
          </Button>
          <hr />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FindPatientByDNI;
