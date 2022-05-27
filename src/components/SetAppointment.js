import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { VaccService } from "../services/vacc.service";
import { AuthService } from "../services/auth.service";
import { NBar } from "./Navbar";
import SetAppointmentConfirm from "./SetAppointmentConfirm";

/**
 * Funcion para sacar un turno de un usuario paciente
 * @returns Retorna un formulario para sacar un turno
 */
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
  /**
   * Funcion que cierra el "Modal" del componenete "SetAppointmentConform"
   */
  const handleClose = () => setShow(false);
  /**
   * Funcion que abre el "Modal" del componenete "SetAppointmentConform"
   */
  const handleShow = () => setShow(true);

  //Renderiza "SetAppointment" solo una vez
  useEffect(() => {
    AuthService.getUser().then((res) => {
      if (res) setUsr(res);
      else navigate("/login");
    });
  }, []);
  /**
   * Funcion que maneja el envio de datos al completar el formulario SetAppointment
   * @param {*} e Representa el evento
   */
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
        setDate(showDate(new Date(data.data.newAppointment.vaccinationDate)));
        handleShow();
      }
    });
  };
  /**
   * Retorna un String con el estilo de visualizacion necesario para SetAppointmentConfirm (Dia/Mes/Año)
   * @param {*} date variable tipo Date con el dia del turno para vacunarse
   * @returns
   */
  const showDate = (date) => {
    let fullDate = "";
    if (date) {
      fullDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    }
    return fullDate;
  };
  /**
   * Funcion que maneja el cambio de "InputVaccine"
   * @param {*} e Representa el evento
   */
  const handleVaccineChange = (e) => {
    //evaluar cual vacuna tiene del covid --> LO DEJAMOS PARA DSP PORQUE NO ESTA EN EL BACK
    setInputVaccineValue(e.target.value);
  };
  /**
   * Funcion que maneja el cambio de "InputVaccinationCenter"
   * @param {*} e Representa el evento
   */
  const handleVaccinationCenterChange = (e) => {
    setInputVaccinationCenterValue(e.target.value);
  };
  /**
   * Funcion que resetea los valores de "InputVaccine" y "InputVaccinationCenter"
   */
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
        <h3>Selecciona los datos de tu turno</h3>

        <select
          className="form-select"
          onChange={handleVaccineChange}
          id="vacc"
          name="vacunas"
          required
        >
          <option></option>
          <option value="Gripe">Gripe</option>
          <option value="Covid1">COVID1</option>
          <option value="Covid2">COVID2</option>
          <option value="Covid3">COVID3</option>
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
        <button type="submit">
          {loadingValue && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          <span>Solicitar Turno</span>
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
        dateData={date}
        vaccinationCenter={inputVaccinationCenterValue}
      />
    </div>
  );
};

export default SetAppointment;
