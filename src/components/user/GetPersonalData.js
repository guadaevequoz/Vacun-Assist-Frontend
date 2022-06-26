import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthService } from "../../services/auth.service";
import { NBar } from "../Navbar";
import getFullDate from "../../helpers/getFullDate";
import getFormattedAddress from "../../helpers/getFormattedAddress";

function GetPersonalData() {
  const navigate = useNavigate();

  const [messageValue, setMessageValue] = useState("");
  const [loadingValue, setLoadingValue] = useState(false);
  const [usr, setUsr] = useState("");

  useEffect(() => {
    AuthService.getUser().then((res) => {
      if (res) setUsr(res);
      else navigate("/login");
    });
  }, []);

  return (
    <>
      <div className="section-container">
        <NBar user={usr} />
        <div className="container">
          <h4>Tus datos son: </h4>
          <li>
            <em>Nombre y apellido: </em> {usr.fullName}{" "}
          </li>
          <li>
            <em>DNI: </em> {usr.dni}{" "}
          </li>
          <li>
            <em>Mail: </em> {usr.email}{" "}
          </li>
          <li>
            <em>Fecha de nacimiento: </em> {getFullDate(usr.birthday)}{" "}
          </li>
          <li>
            <em>Direccion: </em> {getFormattedAddress(usr.home)}{" "}
          </li>
          <li>
            <em>Datos de salud: </em>{" "}
            {usr.isRisk ? "Es de riesgo" : "No es de riesgo"}{" "}
          </li>
        </div>
      </div>
    </>
  );
}

export default GetPersonalData;
