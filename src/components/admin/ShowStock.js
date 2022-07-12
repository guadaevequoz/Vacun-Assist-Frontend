import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NBar } from "../Navbar";
import { AuthService } from "../../services/auth.service";
import { AdminService } from "../../services/admin.service";
import { Button, Modal } from "react-bootstrap";

function ShowStock() {
  const navigate = useNavigate();
  const [inputVaccineValue, setInputVaccineValue] = useState("");
  const [inputVaccinationCenterValue, setInputVaccinationCenterValue] =
    useState("");

  const [messageStock, setMessageStock] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [loadingValue, setLoadingValue] = useState(false);
  const [usr, setUsr] = useState("");
  const [show, setShow] = useState(false);

  const getStock = () => {
    console.log(inputVaccineValue, inputVaccinationCenterValue);
    if (inputVaccineValue && inputVaccinationCenterValue) {
      console.log("entre");
      AdminService.getStock(
        inputVaccineValue,
        inputVaccinationCenterValue
      ).then((res) => {
        console.log(res);
        setMessageStock(
          `El stock actual de la vacuna ${inputVaccineValue} en el vacunatorio ${inputVaccinationCenterValue} es ${res.data.cant}`
        );
      });
    } else setMessageStock("");
  };

  //Renderiza "SetAppointment" solo una vez
  useEffect(() => {
    AuthService.getUser().then((res) => {
      if (res) setUsr(res);
      else navigate("/login");
    });
    getStock();
  }, [inputVaccineValue, inputVaccinationCenterValue]);

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

  return (
    <>
      <div className="section-container">
        <NBar user={usr} />
        <form className="setAppointment">
          <h3>Ingresa los datos para consultar stock. </h3>
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
          {messageStock && <div>{messageStock}</div>}
        </form>
      </div>
    </>
  );
}

export default ShowStock;
