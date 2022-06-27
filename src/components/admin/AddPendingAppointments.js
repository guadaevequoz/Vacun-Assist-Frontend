import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AdminService } from "../../services/admin.service";
import { NBar } from "../Navbar";
import { AuthService } from "../../services/auth.service";
function AddPendingAppointments() {
  const navigate = useNavigate();
  const [usr, setUsr] = useState("");
  const [inputVaccineValue, setInputVaccineValue] = useState("");
  const [inputVaccAmount, setInputVaccineAmount] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [messageValue, setMessageValue] = useState("");

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
   * Funcion que maneja el cambio de "InputDate"
   * @param {*} e Representa el evento
   */
  const handleDate = (e) => {
    setMessageValue("");
    setInputDate(e.target.value);
  };

  /**
   * Funcion que maneja el cambio de "InputVaccineAmount"
   * @param {*} e Representa el evento
   */
  const handleVaccAmount = (e) => {
    setMessageValue("");
    setInputVaccineAmount(e.target.value);
  };

  /**
   * Funcion que maneja el envio de datos al completar el formulario SetAppointment
   * @param {*} e Representa el evento
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      `Voy a agregar ${inputVaccAmount} de ${inputVaccineValue} el dia ${inputDate}`
    );
    setMessageValue("La fecha ta mal");
    /*AdminService.addPendingAppointment(
      inputVaccAmount,
      inputVaccineValue,
      inputDate
    ).then((res) => {
      if (res.status === "fail") {
        setMessageValue(res.data.message);
      } else {
        console.log("se actualizó!!!");
      }
    });*/
  };

  return (
    <>
      <div className="section-container">
        <NBar user={usr} />
        <form className="setAppointment" onSubmit={handleSubmit}>
          <h3>Habilitar turnos</h3>
          <input
            type="number"
            name="stock"
            value={inputVaccAmount}
            onChange={handleVaccAmount}
            id="stock"
            placeholder="Ingresa la cantidad de turnos."
            required
          ></input>

          <label htmlFor="vaccDate">Selecciona la vacuna</label>
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
          <label htmlFor="vaccDate">Ingresa la fecha</label>
          <input
            type="date"
            name="fecha"
            id="vaccDate"
            value={inputDate}
            onChange={handleDate}
            required
          ></input>
          <button type="submit">Habilitar</button>
          {messageValue && (
            <div className="form-group message">
              <div className="alert alert-danger" role="alert">
                {messageValue}
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default AddPendingAppointments;
