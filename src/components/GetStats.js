import { AuthService } from "../services/auth.service";
import { AdminService } from "../services/admin.service";
import { useEffect, useState } from "react";
import { NBar } from "./Navbar";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../css/stats.css";

/**
 * Funcion que muestra en pantalla los turnos de un usuario paciente
 * @returns Retorna una lista con los turnos
 */
ChartJS.register(ArcElement, Tooltip, Legend);

export const dataDays = {
  labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const dataVaccines = {
  labels: ["COVID", "Gripe", "Fiebre Amarilla"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const dataVaccCenter = {
  labels: [
    "Polideportivo",
    "Hospital 9 de Julio",
    "Corralon Municipal",
    "Externo",
  ],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 4],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const GetStats = () => {
  const navigate = useNavigate();
  const [usr, setUsr] = useState("");
  /*
  const [message, setMessage] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [dayStats, setDayStats] = useState("");
  const [vaccinationCenterStats, setVaccinationCenterStats] = useState("");
  const [vaccStats, setVaccStats] = useState("");

  const options = {
    responsive: true,
  };
*/
  //Se renderiza "GetStats" solo una vez
  useEffect(() => {
    AuthService.getUser().then((res) => {
      if (res) setUsr(res);
      else navigate("/login");
    }); /*
    AdminService.getStats().then((res) => {
      setTotalAppointments(res.totalAppointment);
      setVaccinationCenterStats(dataVaccinationCenter);
      setDayStats(dataDay);
      setVaccStats(dataVacss);
    });*/
  }, []);
  //Implementar graficos de torta. Lo intente con react-chartjs-2 pero no pude xd

  return (
    <>
      <div className="section-container">
        <NBar user={usr} />
        <div className="parent">
          <div className="div1">
            <label># Vacunas por día</label>
            <Pie data={dataDays} />
          </div>
          <div className="div2">
            <label># Vacunas por tipo</label>
            <Pie data={dataVaccines} />
          </div>
          <div className="div3">
            <label># Vacunas por vacunador</label>
            <Pie data={dataVaccCenter} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GetStats;
