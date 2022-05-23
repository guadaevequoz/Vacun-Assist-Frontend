import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VaccService } from "../services/vacc.service";
import { AuthService } from "../services/auth.service";
import { NBar } from "./Navbar";

const SetAppointment = () => {
  const navigate = useNavigate();
  const { usr } = AuthService.getCurrentUser();

  const [inputVaccineValue, setInputVaccineValue] = useState("");
  const [inputVaccinationCenterValue, setInputVaccinationCenterValue] =
    useState("");
  const [messageValue, setMessageValue] = useState("");
  const [loadingValue, setLoadingValue] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    VaccService.setAppointment(
      inputVaccineValue,
      inputVaccinationCenterValue
    ).then((res) => {
      if (res.data.status === "fail") {
        setInputVaccineValue("");
        setInputVaccinationCenterValue("");
        setMessageValue(res.data.message);
        setLoadingValue(false);
      } else {
        navigate("/board");
      }
    });
  };
  const handleVaccineChange = (e) => {
    console.log(e.target.value);

    //evaluar cual vacuna tiene del covid --> LO DEJAMOS PARA DSP PORQUE NO ESTA EN EL BACK
    setInputVaccineValue(e.target.value);
  };
  const handleVaccinationCenterChange = (e) => {
    setInputVaccinationCenterValue(e.target.value);
  };
  return (
    <>
      <NBar user={usr} />
      <form className="form-login" onSubmit={handleSubmit}>
        <select
          className="form-select"
          onChange={handleVaccineChange}
          defaultValue={"DEFAULT"}
        >
          <option value="DEFAULT" disabled>
            Selecciona tu vacuna
          </option>
          <option value="Gripe">Gripe</option>
          <option value="Covid1">COVID1</option>
          <option value="Covid2">COVID2</option>
          <option value="Covid3">COVID3</option>
          <option value="FiebreAmarilla">Fiebre amarilla</option>
        </select>
        <select
          className="form-select"
          onChange={handleVaccinationCenterChange}
          defaultValue={"DEFAULT"}
        >
          <option value="DEFAULT" disabled>
            Selecciona tus vacunatorios
          </option>
          <option value="1">Hospital 9 de Julio</option>
          <option value="2">Corralón municipal</option>
          <option value="3">Polideportivo</option>
        </select>
        <button type="submit" className="btn btn-light btn-block">
          {loadingValue && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          <span>Solicitar Turno!</span>
        </button>
        {messageValue && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {messageValue}
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default SetAppointment;
