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
import "./index.css";
import { AuthService } from "./services/auth.service";

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
      <div className="header">
        <img
          src={require("./assets/logo-horizontal-blanco.png")}
          className="header img"
        />
      </div>
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
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
    </>
  );
};

const NotFound = () => {
  return <>Esta ruta no existe. </>;
};

export default VacunAssist;
