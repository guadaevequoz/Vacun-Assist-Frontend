/**
 * En esta App va a ir todo el home con sus respectivas rutas y habilitaciones de botones dependiendo del usuario
 */
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/LogIn";
import Signup from "./components/SignUp";
import Board from "./components/Board";
import ConfirmSignUp from "./components/ConfirmSignUp";
import UploadHealthData from "./components/UploadHealthData";
import GetAppointments from "./components/GetAppointments";
import SetAppointment from "./components/SetAppointment";
import GetAppointmentsVacc from "./components/GetAppointmentsVacc";
import AppointmentValidation from "./components/AppointmentValidation";
import { useNavigate } from "react-router-dom";
import GetAppointmentsAdmin from "./components/GetAppointmentsAdmin";
// import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/login-singup.css";
import "./css/board.css";
import "./css/health-form.css";
import "./css/set-appointment.css";
import "./css/get-appointments.css";
import "./css/validate-appointment.css";
import "./css/navbar.css";
import { AuthService } from "./services/auth.service";

/**
 * Funcion que se ejecuta cuando se abre la aplicacion y carga todas las rutas
 * @returns Retorna todas las rutas necesarias para el funcionamiento de la aplicacion
 */
const VacunAssist = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.getUser().then((res) => {
      if (res) navigate("/board");
      else navigate("/login");
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/confirm" element={<ConfirmSignUp />} />
        <Route path="/board" element={<Board />} />
        <Route path="/uploadhealthdata" element={<UploadHealthData />} />
        <Route path="/getAppointments" element={<GetAppointments />} />
        <Route path="/setAppointment" element={<SetAppointment />} />
        <Route path="/getAppointmentsVacc" element={<GetAppointmentsVacc />} />
        <Route
          path="/appointmentValidation"
          element={<AppointmentValidation />}
        />
        <Route
          path="/getAppointmentsAdmin"
          element={<GetAppointmentsAdmin />}
        />
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
    </>
  );
};
/**
 * Funcion que se ejecuta cunado no encuentra una ruta
 * @returns Retorna un mensaje indicando que no encontro la ruta
 */
const NotFound = () => {
  return <>Esta ruta no existe. </>;
};

export default VacunAssist;
