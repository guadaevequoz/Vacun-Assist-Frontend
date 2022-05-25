/**
 * Componente de subir datos de salud del usuario
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NBar } from "./Navbar";
import { AuthService } from "../services/auth.service";

const UploadHealthData = () => {
  const navigate = useNavigate();
  const [isRisk, setIsRisk] = useState(false);

  const [usr, setUsr] = useState("");

  useEffect(() => {
    AuthService.getUser().then((res) => {
      if (res) setUsr(res);
      else navigate("/login");
    });
  }, []);

  /**
   *
   * @param {*} e representa el evento.
   * Esta función maneja el envio cuando termino de completar el formulario y envio.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    /**
     * Envio los inputs al servicio que se conecta con la API y recibo su respuesta.
     */
    AuthService.uploadHealthData(isRisk).then((res) => {
      if (res) navigate("/board");
      else {
        console.log("no recibio nada");
      }
    });
  };

  const handleIsRisk = (e) => {
    setIsRisk(e.target.checked);
  };
  return (
    <div className="section-container">
      <NBar user={usr} />
      <form className="health-data" onSubmit={handleSubmit}>
        {/* <h1>Cargar datos de salud </h1>
        <hr></hr> */}
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
