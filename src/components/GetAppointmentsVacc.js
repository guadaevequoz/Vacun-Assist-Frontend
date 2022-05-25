import { AuthService } from "../services/auth.service";
import { VaccService } from "../services/vacc.service";
import { useEffect, useState } from "react";
import { NBar } from "./Navbar";
import { VaccList } from "./VaccList";
import { useNavigate } from "react-router-dom";
const GetAppointments = () => {
  const navigate = useNavigate();
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
        if (res) setUsr(res);
        else navigate("/login");
      })
    );
  }, []);

  return (
    <div className="section-container">
      <NBar user={usr} />
      <div className="appointments-container">
        {message.map((data) => {
          return (
            <VaccList
              data={data}
              key={Math.floor(Math.random() * (0 - 9999999) + 0)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GetAppointments;
