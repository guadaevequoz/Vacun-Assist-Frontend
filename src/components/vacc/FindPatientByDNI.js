import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { VaccService } from "../../services/vacc.service";
import LocalApplication from "./LocalApplication";

const FindPatientByDNI = ({ show, handleClose, dni, vaccinationCenter }) => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [DNI, setDNI] = useState("");
  const [appointments, setAppointments] = useState("");
  const [activeCovid, setActiveCovid] = useState(false);
  const [activeFiebreA, setActiveFiebreA] = useState(false);
  const [activeGripe, setActiveGripe] = useState(false);
  const [birthday, setBirthday] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [fail, setFail] = useState(false);

  useEffect(() => {
    if (dni) {
      VaccService.getAppointmentsByDNI(dni).then((res) => {
        console.log(res.data.status);

        if (!(res.data.status === "fail")) {
          console.log("No es fail, me tira esto: ", res.data);
          setFail(false);
          let patient = res.data.data.patient;
          let dataAppointments = res.data.data.appointments;
          console.log(patient, dataAppointments);
          if (dataAppointments) {
            dataAppointments = dataAppointments.filter((data) => {
              return data.vaccinationCenter === vaccinationCenter;
            });
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
          setBirthday(patient.birthday);
          setEmail(patient.email);
          setFullName(patient.fullName);
        } else {
          console.log(res.data.message);
          res.data.message === "Error de conexión con el RENAPER😢"
            ? setMessage(res.data.message)
            : setMessage(
                "No se pudo encontrar datos correspondientes a ese DNI"
              );

          setFail(true);
        }
      });
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

  const handleMail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          {fail ? " Error" : "Compruebe que los datos sean correctos"}
        </Modal.Header>
        <Modal.Body>
          {fail ? (
            <p> {message} </p>
          ) : (
            <>
              <ul>
                <li>Nombre Completo: {fullName}</li>
                <li>DNI:{DNI}</li>
              </ul>
              {appointments === "" ? (
                <div>
                  No esta registrado.
                  <label htmlFor="email">
                    Ingrese el mail del paciente para registrarlo:{" "}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleMail}
                  ></input>
                </div>
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
              <Button
                className="btn-validate"
                onClick={() =>
                  navigate(`/localApp/${DNI}/${birthday}/${email}`)
                }
              >
                Registrar Turno
              </Button>{" "}
            </>
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
