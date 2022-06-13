import { AuthService } from "../services/auth.service";
import { AdminService } from "../services/admin.service";
import { useEffect, useState } from "react";
import { NBar } from "./Navbar";
import { useNavigate } from "react-router-dom";
import getDataStats from "../helpers/getDataStats";
import { Card } from "react-bootstrap";
import { Pie } from "react-chartjs-2";

/**
 * Funcion que muestra en pantalla los turnos de un usuario paciente
 * @returns Retorna una lista con los turnos
 */
const GetStats = () => {
  const navigate = useNavigate();
  const [usr, setUsr] = useState("");
  const [message, setMessage] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [dayStats, setDayStats] = useState("");
  const [vaccinationCenterStats, setVaccinationCenterStats] = useState("");
  const [vaccStats, setVaccStats] = useState("");

  const colors = ["red", "blue", "green", "grey"];
  const options = {
    responsive: true,
  };

  //Se renderiza "GetStats" solo una vez
  useEffect(() => {
    AuthService.getUser().then((res) => {
      if (res) setUsr(res);
      else navigate("/login");
    });
    AdminService.getStats().then((res) => {
      setTotalAppointments(res.totalAppointment);
      const dataVaccinationCenter = getDataStats(
        res.vaccinationCenterStats,
        res.totalAppointment,
        colors
      );
      const dataDay = getDataStats(res.daysStats, res.totalAppointment, colors);
      const dataVacss = getDataStats(
        res.vaccineStats,
        res.totalAppointment,
        colors
      );
      setVaccinationCenterStats(dataVaccinationCenter);
      setDayStats(dataDay);
      setVaccStats(dataVacss);
    });
  }, []);
  //Implementar graficos de torta. Lo intente con react-chartjs-2 pero no pude xd
  return (
    <>
      <div className="section-container">
        <NBar user={usr} />
        <div className="appointments-container">
          <Card style={{ width: "500px", margin: "10px auto" }}>
            <Card.Body>
              <Card.Text>Grafico de torta de vaccinationCenterStats</Card.Text>
              <Card.Text>Grafico de torta de daysStats</Card.Text>
              <Card.Text>Grafico de torta de vaccStats</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default GetStats;
