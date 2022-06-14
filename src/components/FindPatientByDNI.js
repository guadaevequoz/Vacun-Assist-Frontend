import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { VaccService } from "../services/vacc.service";

const FindPatientByDNI = ({ show, handleClose, dni, vaccinationCenter }) => {
  const [fullName, setFullName] = useState("");
  const [DNI, setDNI] = useState("");
  const [appointments, setAppointments] = useState("");
  const [activeCovid, setActiveCovid] = useState(false);
  const [activeFiebreA, setActiveFiebreA] = useState(false);
  const [activeGripe, setActiveGripe] = useState(false);

  useEffect(() => {
    if (dni) {
      VaccService.getAppointmentsByDNI(dni).then(
        ({ patient, appointments: dataAppointments }) => {
          console.log(patient);
          if (dataAppointments) {
            dataAppointments = dataAppointments.filter((data) => {
              return data.vaccinationCenter === vaccinationCenter;
            });
            console.log(activeCovid);
            console.log(activeFiebreA);
            console.log(activeGripe);
            dataAppointments.map((data) => {
              switch (data.vaccine) {
                case "Covid":
                  setActiveCovid(true);
                  break;
                case "Fiebre Amarilla":
                  setActiveFiebreA(true);
                  break;
                case "Gripe":
                  setActiveGripe(true);
                  break;
              }
            });
            setAppointments(dataAppointments);
          }
          setDNI(patient.dni);
          setFullName(patient.fullName);
          console.log(appointments);
        }
      );
    }
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose(appointments);
    setActiveCovid(false);
    setActiveFiebreA(false);
    setActiveGripe(false);
    setAppointments("");
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
          {appointments === "" ? (
            <div>No esta registrado</div>
          ) : appointments.length === 0 ? (
            <div>No tiene turnos activos</div>
          ) : (
            <ul>
              Tiene los siguientes turnos Activos:
              {activeCovid && <li>Covid</li>}
              {activeFiebreA && <li>Fiebre Amarilla</li>}
              {activeGripe && <li>Gripe</li>}
            </ul>
          )}
          <Button className="btn-validate">Registrar Turno</Button>
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
