import { AuthService } from "../services/auth.service";
import { VaccService } from "../services/vacc.service";
import { useEffect, useState } from "react";
import { NBar } from "./Navbar";
import { VaccList } from "./VaccList";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import FindPatientByDNI from "./FindPatientByDNI";

/**
 * Funcion que devuelve una lista de los turnos activos de un usuario vacunador
 * @returns Retorna una lista de los turnos activos
 */
const GetAppointments = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState([]);
  const [usr, setUsr] = useState("");
  const [inputPatientDniValue, setInputPatientDniValue] = useState("");
  const [dniPatientFind, setDniPatientFind] = useState("");
  const [show, setShow] = useState(false);
  //Renderiza "GetAppointments" solo una vez
  useEffect(() => {
    AuthService.getUser().then((res) => {
      if (res) setUsr(res);
      else navigate("/login");
    }, loadAppointments());
    console.log(usr);
  }, []);

  /**
   * Funcion que cierra el "Modal" del componenete "SetAppointmentConform"
   */
  const handleClose = () => setShow(false);
  /**
   * Funcion que abre el "Modal" del componenete "SetAppointmentConform"
   */
  const handleShow = () => setShow(true);
  /**
   * Funcion que devuelve todos los turnos ACTIVOS de un vacunatorio espeficico
   */
  const loadAppointments = (patientAppointments) => {
    if (patientAppointments && !inputPatientDniValue) {
      setMessage(patientAppointments);
    } else {
      VaccService.getAppointments().then(
        ({ appointments }) => {
          let array = appointments.filter((data) => data.state === "Activo");
          setMessage(array);
        },
        (error) => {
          setMessage(error);
        }
      );
    }
  };

  const handlePatientDniChange = (e) => {
    setInputPatientDniValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleShow();
    setInputPatientDniValue("");
  };

  return (
    <div className="section-container">
      <NBar user={usr} />
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="dni"
          value={inputPatientDniValue}
          onChange={handlePatientDniChange}
          placeholder="Ingresa DNI del Paciente."
          min={"1000000"}
          s
          max={"999999999999999999"}
          required
        ></input>
        <button type="submit">
          <span>Buscar</span>
        </button>
      </form>
      <div className="appointments-container">
        {message.length === 0 && (
          <Card style={{ width: "500px", margin: "10px auto" }}>
            <Card.Body>
              <Card.Text>No hay turnos para el día de hoy 😊</Card.Text>
            </Card.Body>
          </Card>
        )}
        {message.map((data) => {
          return (
            <VaccList
              loadAppointments={loadAppointments}
              data={data}
              key={Math.floor(Math.random() * (0 - 9999999) + 0)}
            />
          );
        })}
      </div>
      <FindPatientByDNI
        show={show}
        handleClose={handleClose}
        dni={inputPatientDniValue}
        vaccinationCenter={usr.vaccinationCenter}
        loadAppointments={loadAppointments}
      />
    </div>
  );
};

export default GetAppointments;
