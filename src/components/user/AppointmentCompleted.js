import React, { useState, useEffect } from "react";
import { AuthService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { NBar } from "../Navbar";

const AppointmentCompleted = () => {
  const navigate = useNavigate();

  const [messageValue, setMessageValue] = useState("");
  const [loadingValue, setLoadingValue] = useState(false);
  const [usr, setUsr] = useState("");
  const [inputVaccinationDate, setInputVaccinationDate] = useState("");
  const [inputVaccine, setInputVaccine] = useState("");

  useEffect(() => {
    AuthService.getUser().then((res) => {
      if (res) setUsr(res);
      else navigate("/login");
    });
  }, []);

  /**
   * Funcion que maneja el cambio de "InputVaccinationDate"
   * @param {*} e Representa el evento
   */
  const handleVaccinationDate = (e) => {
    setMessageValue("");
    setInputVaccinationDate(e.target.value);
  };

  /**
   * Funcion que maneja el cambio de "InputVaccine"
   * @param {*} e Representa el evento
   */
  const handleVaccineChange = (e) => {
    setMessageValue("");
    setInputVaccine(e.target.value);
  };

  /**
   * Funcion que maneja el envio de datos para validar un turno
   * @param {*} e representa el evento
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    reset();
    AuthService.setCompletedAppointment(
      inputVaccine,
      inputVaccinationDate
    ).then((res) => {
      if (res.data.status === "fail") {
        setMessageValue(res.data.message);
      } else {
        setMessageValue(
          `Registraste la aplicación de la vacuna ${inputVaccine} el día ${inputVaccinationDate}`
        );
      }
    });
  };

  /**
   * Funcion que resetea los valores de "InputVaccine" y "InputVaccinationCenter"
   */
  const reset = () => {
    document.getElementById("vacc").selectedIndex = 0;
  };

  return (
    <>
      <div className="section-container">
        <NBar user={usr} />
        <form className="setAppointment" onSubmit={handleSubmit}>
          <h3>Registrar aplicación de vacuna</h3>
          <label htmlFor="vacc">Selecciona la vacuna: </label>
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
          <button type="submit">
            {loadingValue && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Registrar aplicacion</span>
          </button>
          {messageValue && (
            <div className="form-group message">
              <div className="alert alert-info" role="alert">
                {messageValue}
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default AppointmentCompleted;
