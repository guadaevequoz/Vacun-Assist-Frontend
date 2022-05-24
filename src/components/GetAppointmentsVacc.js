import { AuthService } from "../services/auth.service";
import { VaccService } from "../services/vacc.service";
import { useEffect, useState } from "react";
import { NBar } from "./Navbar";
import { VaccList } from "./VaccList";

const GetAppointments = () => {
  const [message, setMessage] = useState([""]);
  const [usr, setUsr] = useState("");

  useEffect(() => {
    VaccService.getAppointments().then(
      ({ appointments }) => {
        setMessage([...appointments]);
      },
      (error) => {
        setMessage(error);
      },
      AuthService.getUser().then((res) => {
        setUsr(res);
      })
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
