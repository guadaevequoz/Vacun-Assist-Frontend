import { AuthService } from "../services/auth.service";
import { VaccService } from "../services/vacc.service";
import { AppointmentsList } from "./AppointmentsList";
import { useEffect, useState } from "react";
import { NBar } from "./Navbar";

const GetAppointments = () => {
  const { usr } = AuthService.getCurrentUser();
  const [message, setMessage] = useState([""]);
  useEffect(() => {
    VaccService.getAppointments().then(
      ({ appointments }) => {
        setMessage([...appointments]);
      },
      (error) => {
        setMessage(error);
      }
    );
  }, []);

  return (
    <>
      <NBar user={usr} />
      {message.map((data, idx) => {
        return (
          <AppointmentsList
            data={data}
            key={Math.floor(Math.random() * (0 - 9999999) + 0)}
          />
        );
      })}
    </>
  );
};

export default GetAppointments;
