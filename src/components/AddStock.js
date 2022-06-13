import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NBar } from "./Navbar";
import { AuthService } from "../services/auth.service";

import { Button, Modal } from "react-bootstrap";

function AddStock() {
  const navigate = useNavigate();
  const [inputStockValue, setInputStockValue] = useState("");
  const [inputVaccineValue, setInputVaccineValue] = useState("");
  const [inputVaccinationCenterValue, setInputVaccinationCenterValue] =
    useState("");
  const [messageValue, setMessageValue] = useState("");
  const [loadingValue, setLoadingValue] = useState(false);
  const [usr, setUsr] = useState("");
  const [show, setShow] = useState(false);

  /**
   * Funcion que cierra el "Modal" del componenete "SetAppointmentConform"
   */
  const handleClose = () => setShow(false);
  /**
   * Funcion que abre el "Modal" del componenete "SetAppointmentConform"
   */
  const handleShow = () => setShow(true);

  //Renderiza "SetAppointment" solo una vez
  useEffect(() => {
    AuthService.getUser().then((res) => {
      if (res) setUsr(res);
      else navigate("/login");
    });
  }, []);

  /**
   * Funcion que maneja el cambio de "InputVaccine"
   * @param {*} e Representa el evento
   */
  const handleVaccineChange = (e) => {
    setMessageValue("");
    setInputVaccineValue(e.target.value);
  };
  /**
   * Funcion que maneja el cambio de "InputVaccinationCenter"
   * @param {*} e Representa el evento
   */
  const handleVaccinationCenterChange = (e) => {
    setMessageValue("");
    setInputVaccinationCenterValue(e.target.value);
  };

  /**
   * Funcion que maneja el cambio de "InputStock"
   * @param {*} e Representa el evento
   */
  const handleStockChange = (e) => {
    setMessageValue("");
    setInputStockValue(e.target.value);
  };

  /**
   * Funcion que maneja el envio de datos al completar el formulario SetAppointment
   * @param {*} e Representa el evento
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // ELSERVICE.addStock(inputStockValue, inputVaccineValue, inputVaccinationCenterValue).then(({ data }) => {
    //   if (data.status === "fail") {
    //     setMessageValue(data.message);
    //     setLoadingValue(false);
    //   } else {
    //     handleShow();
    //   }
    // });
    reset();
    handleShow();
  };

  /**
   * Funcion que resetea los valores de "InputVaccine" y "InputVaccinationCenter"
   */
  const reset = () => {
    document.getElementById("vacc").selectedIndex = 0;
    document.getElementById("vaccCenter").selectedIndex = 0;
    document.getElementById("stock").innerText = " "; //NO ANDA DIOS YA INTENTE CON .value y con .reset() Y NO FUNCIONAAAAAAA
  };

  return (
    <>
      <div className="section-container">
        <NBar user={usr} />
        <form className="setAppointment" onSubmit={handleSubmit}>
          <h3>Ingresa los datos para ingresar stock. </h3>
          <select
            className="form-select"
            onChange={handleVaccineChange}
            id="vacc"
            name="vacunas"
            required
          >
            <option></option>
            <option value="Gripe">Gripe</option>
            <option value="Covid">COVID</option>
            <option value="FiebreAmarilla">Fiebre amarilla</option>
          </select>
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
          <input
            type="number"
            name="stock"
            value={inputStockValue}
            onChange={handleStockChange}
            id="stock"
            placeholder="Ingresa el stock."
            required
          ></input>
          <button type="submit">
            {loadingValue && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Agregar</span>
          </button>
          {messageValue && (
            <div className="form-group message">
              <div className="alert alert-danger" role="alert">
                {messageValue}
              </div>
            </div>
          )}
        </form>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>Se actualizó el stock exitosamente!</Modal.Header>
        <Modal.Body>
          Se actualizó el stock de la vacuna {inputVaccineValue} al vacunatorio
          {inputVaccinationCenterValue}
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-validate" type="submit" onClick={handleClose}>
            Ok
          </Button>
          <hr />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddStock;
