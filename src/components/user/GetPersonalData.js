import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthService } from "../../services/auth.service";
import { NBar } from "../Navbar";
import getFullDate from "../../helpers/getFullDate";
import getFormattedAddress from "../../helpers/getFormattedAddress";

function GetPersonalData() {
  const navigate = useNavigate();

  const [usrAddress, setUsrAddress] = useState("");
  const [usr, setUsr] = useState("");

  useEffect(() => {
    AuthService.getUser().then((res) => {
      if (res) {
        setUsr(res);
        setUsrAddress(res.home);
      } else navigate("/login");
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
            <em>Datos de salud: </em>{" "}
            {usr.isRisk
              ? "Soy paciente de riesgo"
              : "No soy paciente de riesgo"}{" "}
          </li>
        </div>
      </div>
    </>
  );
}

export default GetPersonalData;
