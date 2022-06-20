import React, { useState, useEffect } from "react";
import { NBar } from "../Navbar";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { AuthService } from "../../services/auth.service";
import { AdminService } from "../../services/admin.service";

function RegisterVaccinator() {
  const navigate = useNavigate();
  const [usr, setUsr] = useState("");
  const [show, setShow] = useState(false);
  const [messageValue, setMessageValue] = useState("");
  const [loadingValue, setLoadingValue] = useState(false);

  const [inputDniValue, setInputDniValue] = useState("");
  const [email, setEmail] = useState("");
  const [inputVaccinationCenterValue, setInputVaccinationCenterValue] =
    useState("");
  const [vaccinator, setVaccinator] = useState("");

  useEffect(() => {
    AuthService.getUser().then((res) => {
      if (res) setUsr(res);
      else navigate("/login");
    });
  }, []);

  /**
   * Función que maneja el envio de datos cuando termino de completar el formulario SignUp
   * @param {*} e representa el evento.
   */
  const handlePrimerSubmit = (e) => {
    e.preventDefault();

    console.log(inputDniValue);

    AdminService.getUserRenaper(inputDniValue).then((res) => {
      if (res.status === "fail") {
        setMessageValue(res.message);
        setLoadingValue(false);
      } else {
        setVaccinator(res.data.fullName);
        handleShow();
      }
    });
  };

  /**
   * Funcion que maneja el cambio de "InputDni"
   * @param {*} e representa el evento.
   */
  const handleDniChange = (e) => {
    setMessageValue("");
    setInputDniValue(e.target.value);
  };

  /**
   * Funcion que maneja el cambio de "InputMail"
   * @param {*} e representa el evento.
   */
  const handleMail = (e) => {
    setEmail(e.target.value);
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
   * Funcion que cierra el "Modal" del componenete "SetAppointmentConform"
   */
  const handleClose = () => setShow(false);

  /**
   * Funcion que abre el "Modal" del componenete "SetAppointmentConform"
   */
  const handleShow = () => setShow(true);

  /**
   * Funcion que resetea los valores de "InputVaccine" y "InputVaccinationCenter"
   */
  const reset = () => {
    setInputDniValue("");
    setEmail("");
    document.getElementById("vaccCenter").selectedIndex = 0;
  };

  const handleSubmit = () => {
    console.log("entre");
    AuthService.signupVaccinator(
      inputDniValue,
      email,
      inputVaccinationCenterValue
    ).then((res) => {
      console.log(res.data);
      if (res.data.status === "fail") {
        setMessageValue(res.data.message);
        setLoadingValue(false);
      } else {
      }
    });
    reset();
    handleClose();
  };
  return (
    <>
      <div className="section-container">
        <NBar user={usr} />
        <form className="form-login" onSubmit={handlePrimerSubmit}>
          <h3 className="form-login-signup-header">
            Por favor completá estos datos para continuar.
          </h3>
          <input
            type="number"
            name="dni"
            id="dni"
            value={inputDniValue}
            onChange={handleDniChange}
            placeholder="Ingresa el DNI del vacunador"
            min={"1000000"}
            s
            max={"999999999999999999"}
            required
          ></input>
          <label htmlFor="email">Ingrese el mail del vacunador: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleMail}
          ></input>
          <label htmlFor="vaccCenter">
            Selecciona el centro de vacunación:
          </label>
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
          <button type="submit">
            {loadingValue && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Registrar vacunador</span>
          </button>
          {messageValue && (
            <div className="form-group message">
              <div className="alert alert-danger" role="alert">
                {messageValue}
              </div>
            </div>
          )}
        </form>{" "}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>Valida los datos y confirma.</Modal.Header>
        <Modal.Body>Los datos del vacunador son: {vaccinator}</Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={handleSubmit}>
            {loadingValue && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Confirmar y registrar</span>
          </Button>
          <Button type="submit" onClick={handleClose}>
            <span>Cancelar</span>
          </Button>
          <hr />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegisterVaccinator;
