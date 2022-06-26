import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NBar } from "../Navbar";
import { AuthService } from "../../services/auth.service";

/**
 * Funcion que permite actualizar los datos de salud de un usuario paciente
 * @returns Retorna un formulario para actualiar los datos de salud
 */
const UpdateHealthData = () => {
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
    console.log(isRisk);
    /*AuthService.uploadHealthData(isRisk).then((res) => {
      if (res) navigate("/board");
      else {
        console.log("no recibio nada");
      }
    });*/
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
        <h5>Por el presente certifico que mis datos de salud cambiaron.</h5>
        <div className="form-check">
          <div className="radio">
            <label>
              <input
                type="radio"
                value="true"
                checked={isRisk === "true"}
                onChange={handleIsRisk}
              />
              Soy de riesgo
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
              No soy de riesgo
            </label>
          </div>
        </div>
        <button type="submit">Modificar datos</button>
      </form>
    </div>
  );
};

export default UpdateHealthData;
