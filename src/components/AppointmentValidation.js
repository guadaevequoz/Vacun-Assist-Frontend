import React, { useState, useEffect } from "react";
import { AuthService } from "../services/auth.service";
import { Button, Modal } from "react-bootstrap";
import { VaccService } from "../services/vacc.service";

const AppointmentValidation = ({ show, handleClose, id }) => {
  const [inputLot, setInputLot] = useState("");
  const [messageValue, setMessageValue] = useState("");

  const [usr, setUsr] = useState("");

  useEffect(() => {
    AuthService.getUser().then((res) => {
      setUsr(res);
    });
  }, []);

  const handleLotChange = (e) => {
    setInputLot(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id, inputLot);
    VaccService.validateAppointment(id, inputLot, "Finalizado").then((res) => {
      if (res) {
        setMessageValue("El turno se valido con exito.");
      }
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Validar Turno para DNI:{usr.patientDni}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            name="lot"
            value={inputLot}
            onChange={handleLotChange}
            placeholder="Ingrese el Lote"
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Validar
          </Button>
          <hr />
          {messageValue && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {messageValue}
              </div>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AppointmentValidation;
