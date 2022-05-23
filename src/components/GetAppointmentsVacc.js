import { AuthService } from "../services/auth.service";
import { VaccService } from "../services/vacc.service";
import { useEffect, useState } from "react";
import { NBar } from "./Navbar";
import { VaccList } from "./VaccList";

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
      {message.map((data) => {
        return <VaccList data={data} />;
      })}
    </>
  );
};

export default GetAppointments;
