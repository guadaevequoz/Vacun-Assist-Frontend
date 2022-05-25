import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { VaccService } from "../services/vacc.service";
import { AuthService } from "../services/auth.service";
import { NBar } from "./Navbar";
import { Button, Modal } from "react-bootstrap";
import SetAppointmentConfirm from "./SetAppointmentConfirm";

const SetAppointment = () => {
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const [inputVaccineValue, setInputVaccineValue] = useState("");
  const [inputVaccinationCenterValue, setInputVaccinationCenterValue] =
    useState("");
  const [messageValue, setMessageValue] = useState("");
  const [loadingValue, setLoadingValue] = useState(false);

  const [usr, setUsr] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    AuthService.getUser().then((res) => {
      if (res) setUsr(res);
      else navigate("/login");
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    reset();
    VaccService.setAppointment(
      inputVaccineValue,
      inputVaccinationCenterValue
    ).then(({ data }) => {
      if (data.status === "fail") {
        setMessageValue(data.message);
        setLoadingValue(false);
      } else {
        setDate(data.data.newAppointment.vaccinationDate);
        handleShow();
      }
    });
  };
  const handleVaccineChange = (e) => {
    //evaluar cual vacuna tiene del covid --> LO DEJAMOS PARA DSP PORQUE NO ESTA EN EL BACK
    setInputVaccineValue(e.target.value);
  };
  const handleVaccinationCenterChange = (e) => {
    setInputVaccinationCenterValue(e.target.value);
  };

  const reset = () => {
    const vacc = document.getElementById("vacc");
    const vaccCenter = document.getElementById("vaccCenter");
    vacc.selectedIndex = 0;
    vaccCenter.selectedIndex = 0;
  };

  return (
    <div className="section-container">
      <NBar user={usr} />
      <form className="setAppointment" onSubmit={handleSubmit}>
        <h3>selecciona los datos de tu turno</h3>

        <select
          className="form-select"
          onChange={handleVaccineChange}
          id="vacc"
          name="vacunas"
          required
        >
          {/*<option value="" disabled>
            Selecciona tu vacuna
  </option>*/}
          <option></option>
          <option value="Gripe">Gripe</option>
          <option value="Covid1">COVID1</option>
          <option value="Covid2">COVID2</option>
          <option value="Covid3">COVID3</option>
          <option value="FiebreAmarilla">Fiebre amarilla</option>
        </select>
        {/* <label htmlFor="vacunatorios">Selecciona tus vacunatorios:</label> */}
        <select
          className="form-select"
          onChange={handleVaccinationCenterChange}
          id="vaccCenter"
          name="vacunatorios"
          required
        >
          {/*<option value="" disabled>
            Selecciona tus vacunatorios
  </option>*/}
          <option></option>
          <option value="1">Hospital 9 de Julio</option>
          <option value="2">Corralón municipal</option>
          <option value="3">Polideportivo</option>
        </select>
        <button type="submit">
          {loadingValue && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          <span>Solicitar Turno!</span>
        </button>
        {messageValue && (
          <div className="form-group message">
            <div className="alert alert-danger" role="alert">
              {messageValue}
            </div>
          </div>
        )}
      </form>
      <SetAppointmentConfirm
        show={show}
        handleClose={handleClose}
        data={date}
      />
    </div>
  );
};

export default SetAppointment;
