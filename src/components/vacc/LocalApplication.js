import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { NBar } from "../Navbar";
import { AuthService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { VaccService } from "../../services/vacc.service";
import { AdminService } from "../../services/admin.service";

function LocalApplication() {
  let { dni, birthday, email } = useParams();
  console.log(dni, birthday, email);
  const navigate = useNavigate();
  const [inputVaccineValue, setInputVaccineValue] = useState("");

  const [messageValue, setMessageValue] = useState("");
  const [messageConfirmValue, setMessageConfirmValue] = useState("");
  const [messageStock, setMessageStock] = useState("");

  const [loadingValue, setLoadingValue] = useState(false);
  const [inputLot, setInputLot] = useState("");
  const [inputMark, setInputMark] = useState("");
  const [usr, setUsr] = useState("");

  const getStock = () => {
    console.log(inputVaccineValue, usr.vaccinationCenter);
    if (inputVaccineValue) {
      console.log(inputVaccineValue + " " + usr.vaccinationCenter);
      AdminService.getStock(inputVaccineValue, usr.vaccinationCenter).then(
        (res) => {
          console.log(res);
          setMessageStock(`El stock actual es ${res.data.cant}`);
        }
      );
    } else setMessageStock("");
  };

  useEffect(() => {
    AuthService.getUser().then((res) => {
      if (res) setUsr(res);
      else navigate("/login");
    });
    getStock();
  }, [inputVaccineValue]);

  /**
   * Funcion que maneja el cambio del "InputLot"
   * @param {*} e representa el evento.
   */
  const handleLotChange = (e) => {
    setMessageValue("");
    setMessageConfirmValue("");
    setInputLot(e.target.value);
  };

  /**
   * Funcion que maneja el cambio del "InputMark"
   * @param {*} e representa el evento.
   */
  const handleMarkChange = (e) => {
    setMessageValue("");
    setMessageConfirmValue("");
    setInputMark(e.target.value);
  };

  /**
   * Funcion que maneja el cambio de "InputVaccine"
   * @param {*} e Representa el evento
   */
  const handleVaccineChange = (e) => {
    setMessageValue("");
    setMessageConfirmValue("");
    console.log(inputVaccineValue);
    setInputVaccineValue(e.target.value);
  };

  /**
   * Funcion que maneja el envio de datos para validar un turno
   * @param {*} e representa el evento
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    VaccService.registerLocalApliccation(
      inputVaccineValue,
      inputMark,
      inputLot,
      usr.vaccinationCenter,
      dni,
      birthday,
      email
    ).then((res) => {
      if (res.data.status === "fail") {
        reset();
        setMessageValue(res.data.message);
      } else {
        reset();
        setMessageConfirmValue(
          `El turno para el DNI: ${dni} contra ${inputVaccineValue} se registro correctamente 😁`
        );
      }
    });
  };
  const reset = () => {
    setInputLot("");
    setInputMark("");
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
          {messageStock && <div>{messageStock}</div>}
          <input
            type="text"
            name="lot"
            value={inputLot}
            onChange={handleLotChange}
            placeholder="Ingrese el Lote"
          ></input>
          <input
            type="text"
            name="mark"
            value={inputMark}
            onChange={handleMarkChange}
            placeholder="Ingrese la marca"
          ></input>
          <button type="submit">
            {loadingValue && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Registrar aplicacion</span>
          </button>
          {messageValue && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {messageValue}
              </div>
            </div>
          )}
          {messageConfirmValue && (
            <div className="form-group message">
              <div className="alert alert-info" role="alert">
                {messageConfirmValue}
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default LocalApplication;
