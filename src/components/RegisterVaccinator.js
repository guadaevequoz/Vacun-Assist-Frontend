import React, { useState, useEffect } from "react";
import { NBar } from "./Navbar";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { AuthService } from "../services/auth.service";

function RegisterVaccinator() {
  const navigate = useNavigate();
  const [usr, setUsr] = useState("");
  const [show, setShow] = useState(false);
  const [inputDniValue, setInputDniValue] = useState("");
  const [inputMailValue, setInputMailValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [loadingValue, setLoadingValue] = useState(false);

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
  const handleSubmit = (e) => {
    e.preventDefault();
    reset();
    handleShow();
    // AuthService.signupVaccinator(
    //   inputDniValue,
    //   inputMailValue
    // ).then((res) => {
    //   if (res.data.status === "fail") {
    //     setMessageValue(res.data.message);
    //     setLoadingValue(false);
    //   } else {
    //     navigate("/registerVaccinator");
    //   }
    // });
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
  const handleMailChange = (e) => {
    setMessageValue("");
    setInputMailValue(e.target.value);
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
    document.getElementById("dni").innerText = "";
    document.getElementById("email").innerText = "";
  };
  return (
    <>
      <div className="section-container">
        <NBar user={usr} />
        <form className="form-login" onSubmit={handleSubmit}>
          <h3 className="form-login-signup-header">
            Por favor completá estos datos para continuar.
          </h3>
          <input
            type="number"
            name="dni"
            id="dni"
            value={inputDniValue}
            onChange={handleDniChange}
            placeholder="Ingresa tu DNI."
            min={"1000000"}
            s
            max={"999999999999999999"}
            required
          ></input>
          <input
            type="email"
            name="email"
            id="email"
            value={inputMailValue}
            onChange={handleMailChange}
            placeholder="Ingresa tu mail."
            required
          ></input>
          <button type="submit">
            {loadingValue && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Registrarse</span>
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
        <Modal.Header>Se registro al vacunador exitosamente!</Modal.Header>
        <Modal.Body>
          Se registro al vacunador con DNI {inputDniValue} y se le envió un mail
          con su contraseña y token de ingreso.
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

export default RegisterVaccinator;
