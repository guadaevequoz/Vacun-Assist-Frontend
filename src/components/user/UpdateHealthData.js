import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NBar } from "../Navbar";
import { AuthService } from "../../services/auth.service";
import { Button, Modal } from "react-bootstrap";

/**
 * Funcion que permite actualizar los datos de salud de un usuario paciente
 * @returns Retorna un formulario para actualiar los datos de salud
 */
const UpdateHealthData = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [isRisk, setIsRisk] = useState(false);
  const [message, setMessage] = useState("");

  const [usr, setUsr] = useState("");

  const handleClose = () => {
    setShow(false);
    navigate("/board");
  };
  const handleShow = () => setShow(true);

  //Se renderiza "UpdateHealthData" solo una vez
  useEffect(() => {
    AuthService.getUser().then((res) => {
      if (res) setUsr(res);
      else navigate("/login");
    });
  }, []);

  /**
   * Esta función maneja el envio de datso cuando termino de completar el formulario UploadHealthData
   * @param {*} e representa el evento.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isRisk);
    AuthService.uploadHealthData(isRisk).then((res) => {
      if (res) {
        setMessage("Tus datos se han guardado con éxito!");
      } else {
        setMessage("Hubo un error.");
      }

      handleShow();
    });
  };

  /**
   * Funcion que maneja el cambio de "InputIsRisk"
   * @param {*} e representa el evento.
   */
  const handleIsRisk = (e) => {
    setIsRisk(e.target.value);
  };

  return (
    <div className="section-container">
      <NBar user={usr} />
      <form onSubmit={handleSubmit} className="health-data">
        <h3>Modificar datos de salud</h3>
        <p>
          Actualmente tus datos de salud indican que{" "}
          {usr.isRisk ? "sos paciente de riesgo" : "no sos paciente de riesgo"}.
        </p>
        <p>Para cambiar tus datos selecciona tu estado actual de salud!</p>
        <div className="form-check">
          <div className="radio">
            <label>
              <input
                type="radio"
                value="true"
                checked={isRisk === "true"}
                onChange={handleIsRisk}
              />
              Soy paciente de riesgo
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="false"
                checked={isRisk === "false"}
                onChange={handleIsRisk}
              />
              No soy paciente de riesgo
            </label>
          </div>
        </div>
        <button type="submit">Modificar datos</button>
      </form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{message}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tus datos se actualizaron a:{" "}
          {isRisk === "true" ? "Soy de riesgo" : "No soy de riesgo"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateHealthData;
