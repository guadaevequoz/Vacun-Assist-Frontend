import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NBar } from "../Navbar";
import { AuthService } from "../../services/auth.service";

/**
 * Funcion que permite actualizar los datos de salud de un usuario paciente
 * @returns Retorna un formulario para actualiar los datos de salud
 */
const UploadHealthData = () => {
  const navigate = useNavigate();
  const [isRisk, setIsRisk] = useState(false);

  const [usr, setUsr] = useState("");

  //Se renderiza "UploadHealthData" solo una vez
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
    AuthService.uploadHealthData(isRisk).then((res) => {
      if (res) navigate("/board");
      else {
        console.log("no recibio nada");
      }
    });
  };

  /**
   * Funcion que maneja el cambio de "InputIsRisk"
   * @param {*} e representa el evento.
   */
  const handleIsRisk = (e) => {
    setIsRisk(e.target.checked);
  };

  return (
    <div className="section-container">
      <NBar user={usr} />
      <form className="health-data" onSubmit={handleSubmit}>
        <h3>Completa el cuestionario de salud para poder sacar tu turno.</h3>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isRisk}
            onChange={handleIsRisk}
          />
          <label className="form-check-label">
            Tengo condiciones de salud que me catalogan como una persona de
            riesgo
          </label>
        </div>
        <button type="submit">Enviar mis datos</button>
      </form>
    </div>
  );
};

export default UploadHealthData;
