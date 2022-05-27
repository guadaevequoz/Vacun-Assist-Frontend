import React, { useState, useEffect } from "react";
import { AuthService } from "../services/auth.service";
import { Button, Modal } from "react-bootstrap";
import { VaccService } from "../services/vacc.service";
import { useNavigate } from "react-router-dom";
import GetAppointments from "./GetAppointmentsVacc";

/**
 * Muestra la opcion para validar la aplicacion de un turno, ingresando el lote de la vacuna
 * @param {*} loadAppointments Funcion que recarga la lista de turnos activos
 * @param {*} show Determina si el "Modal" se visualiza o no
 * @param {*} handleClose Funcion que cierra el "Modal" una vez validado el turno
 * @param {*} id Identificador del turno a validar
 * @returns Retorna un "Modal" que se despliega en pantalla para validar un turno espeficico
 */
const AppointmentValidation = ({ loadAppointments, show, handleClose, id }) => {
  const navigate = useNavigate();
  const [inputLot, setInputLot] = useState("");
  const [inputMark, setInputMark] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [usr, setUsr] = useState("");

  //Solo se renderiza "AppointmentValidation" si el parametro "show" cambia
  useEffect(() => {
    AuthService.getUser().then((res) => {
      if (res) setUsr(res);
      else navigate("/login");
    });
  }, [show]);

  /**
   * Funcion que maneja el cambio del "InputLot"
   * @param {*} e representa el evento.
   */
  const handleLotChange = (e) => {
    setInputLot(e.target.value);
  };

  /**
   * Funcion que maneja el cambio del "InputMark"
   * @param {*} e representa el evento.
   */
  const handleMarkChange = (e) => {
    setInputMark(e.target.value);
  };

  /**
   * Funcion que maneja el envio de datos para validar un turno
   * @param {*} e representa el evento
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    VaccService.validateAppointment(id, inputLot, inputMark, "Finalizado").then(
      (res) => {
        if (res.data.status === "fail") {
          setInputLot("");
          setMessageValue(res.data.message);
        } else {
          handleClose();
          loadAppointments();
        }
      }
    );
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Validar turno para DNI: {usr.patientDni}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            name="lot"
            value={inputLot}
            onChange={handleLotChange}
            placeholder="Ingrese el Lote"
          ></input>
          <div>
            {" "}
            <input
              type="text"
              name="mark"
              value={inputMark}
              onChange={handleMarkChange}
              placeholder="Ingrese la marca"
            ></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-close-validate" onClick={handleClose}>
            Cerrar
          </Button>
          <Button className="btn-validate" type="submit" onClick={handleSubmit}>
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
