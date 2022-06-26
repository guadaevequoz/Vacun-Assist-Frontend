/**
 * En esta App va a ir todo el home con sus respectivas rutas y habilitaciones de botones dependiendo del usuario
 */
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/LogIn";
import Signup from "./components/SignUp";
import Board from "./components/Board";
import ConfirmSignUp from "./components/ConfirmSignUp";
import UploadHealthData from "./components/user/UploadHealthData";
import GetAppointments from "./components/user/GetAppointments";
import SetAppointment from "./components/user/SetAppointment";
import GetAppointmentsVacc from "./components/vacc/GetAppointmentsVacc";
import AppointmentValidation from "./components/vacc/AppointmentValidation";
import { useNavigate } from "react-router-dom";
import GetStats from "./components/admin/GetStats";
import LocalApplication from "./components/vacc/LocalApplication";
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
import AddStock from "./components/admin/AddStock";
import AppointmentCompleted from "./components/user/AppointmentCompleted";
import RegisterVaccinator from "./components/admin/RegisterVaccinator";
import UpdateHealthData from "./components/user/UpdateHealthData";

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
        <Route path="/updatehealthdata" element={<UpdateHealthData />} />
        <Route path="/getAppointments" element={<GetAppointments />} />
        <Route path="/setAppointment" element={<SetAppointment />} />
        <Route path="/getAppointmentsVacc" element={<GetAppointmentsVacc />} />
        <Route
          path="/appointmentValidation"
          element={<AppointmentValidation />}
        />
        <Route path="/getStats" element={<GetStats />} />
        <Route path="/addStock" element={<AddStock />} />
        <Route path="/registerVaccinator" element={<RegisterVaccinator />} />
        <Route
          path="/appointmentCompleted"
          element={<AppointmentCompleted />}
        />
        <Route
          path="/localApp/:dni/:birthday/:email"
          element={<LocalApplication />}
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
