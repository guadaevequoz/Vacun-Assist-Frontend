import React, { useState, useEffect } from "react";
import { AuthService } from "../services/auth.service";
import { Button, Modal } from "react-bootstrap";
import { VaccService } from "../services/vacc.service";
import { useNavigate } from "react-router-dom";

/**
 * Muestra la opcion para validar la aplicacion de un turno, ingresando el lote de la vacuna
 * @param {*} loadAppointments Funcion que recarga la lista de turnos activos
 * @param {*} show Determina si el "Modal" se visualiza o no
 * @param {*} handleClose Funcion que cierra el "Modal" una vez validado el turno
 * @returns Retorna un "Modal" que se despliega en pantalla para validar un turno espeficico
 */
const AppointmentCompleted = ({
  loadAppointments,
  show,
  handleClose,
  vaccine,
}) => {
  const navigate = useNavigate();

  const [messageValue, setMessageValue] = useState("");
  const [usr, setUsr] = useState("");
  const [inputVaccinationCenterValue, setInputVaccinationCenterValue] =
    useState("");
  const [inputVaccinationDate, setInputVaccinationDate] = useState("");

  //Solo se renderiza "AppointmentValidation" si el parametro "show" cambia
  useEffect(() => {
    AuthService.getUser().then((res) => {
      if (res) setUsr(res);
      else navigate("/login");
    });
  }, [show]);

  /**
   * Funcion que maneja el cambio de "InputVaccinationCenter"
   * @param {*} e Representa el evento
   */
  const handleVaccinationCenterChange = (e) => {
    setMessageValue("");
    setInputVaccinationCenterValue(e.target.value);
  };

  /**
   * Funcion que maneja el cambio de "InputVaccinationDate"
   * @param {*} e Representa el evento
   */
  const handleVaccinationDate = (e) => {
    setMessageValue("");
    setInputVaccinationCenterValue(e.target.value);
  };

  /**
   * Funcion que maneja el envio de datos para validar un turno
   * @param {*} e representa el evento
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    reset();
    VaccService.setCompletedAppointment().then((res) => {
      if (res.data.status === "fail") {
        setMessageValue(res.data.message);
      } else {
        handleClose();
        loadAppointments();
      }
    });
  };

  /**
   * Funcion que resetea los valores de "InputVaccine" y "InputVaccinationCenter"
   */
  const reset = () => {
    const vaccCenter = document.getElementById("vaccCenter");
    vaccCenter.selectedIndex = 0;
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Registrar aplicación de vacuna: {vaccine}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label htmlFor="vaccDate">Ingresa la fecha de aplicación: </label>
            <input
              type="date"
              name="fecha"
              id="vaccDate"
              value={inputVaccinationDate}
              onChange={handleVaccinationDate}
              required
            ></input>
          </div>
          <label htmlFor="vaccCenter">Ingresa el centro de vacunación:</label>
          <select
            className="form-select"
            onChange={handleVaccinationCenterChange}
            id="vaccCenter"
            name="vacunatorios"
            required
          >
            <option></option>
            <option value="Hospital 9 de Julio">Hospital 9 de Julio</option>
            <option value="Corralón municipal">Corralón municipal</option>
            <option value="Polideportivo">Polideportivo</option>
          </select>
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

export default AppointmentCompleted;
