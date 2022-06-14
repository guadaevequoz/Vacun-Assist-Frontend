import { AuthService } from "../services/auth.service";
import { AdminService } from "../services/admin.service";
import { useEffect, useState } from "react";
import { NBar } from "./Navbar";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../css/stats.css";
import getDataStats from "../helpers/getDataStats";

/**
 * Funcion que muestra en pantalla los turnos de un usuario paciente
 * @returns Retorna una lista con los turnos
 */
ChartJS.register(ArcElement, Tooltip, Legend);

const GetStats = () => {
  const navigate = useNavigate();
  const [usr, setUsr] = useState("");

  const [dayLabelStats, setDayLabelStats] = useState([]);
  const [dayDataStats, setSayDataStats] = useState([]);
  const [vaccinationCenterLabelStats, setVaccinationCenterLabelStats] =
    useState([]);
  const [vaccinationCenterDataStats, setVaccinationCenterDataStats] = useState(
    []
  );
  const [vaccineLabelStats, setVaccineLabelStats] = useState([]);
  const [vaccineDataStats, setVaccineDataStats] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState("");

  const dataDays = {
    labels: dayLabelStats,
    datasets: [
      {
        label: "# of Votes",
        data: dayDataStats,
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

  const dataVaccCenter = {
    labels: vaccinationCenterLabelStats,
    datasets: [
      {
        label: "# of Votes",
        data: vaccinationCenterDataStats,
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

  const dataVaccines = {
    labels: vaccineLabelStats,
    datasets: [
      {
        label: "# of Votes",
        data: vaccineDataStats,
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
  //Se renderiza "GetStats" solo una vez
  useEffect(() => {
    AuthService.getUser().then((res) => {
      if (res) setUsr(res);
      else navigate("/login");
    });
    AdminService.getStats().then((res) => {
      const { labels: labelsDays, data: dataDays } = getDataStats(
        res.daysStats,
        res.totalAppointment
      );
      setDayLabelStats(labelsDays);
      setSayDataStats(dataDays);

      const { labels: labelsVaccCenter, data: dataVaccCenter } = getDataStats(
        res.vaccinationCenterStats,
        res.totalAppointment
      );
      setVaccinationCenterLabelStats(labelsVaccCenter);
      setVaccinationCenterDataStats(dataVaccCenter);

      const { labels: labelsVacc, data: dataVacc } = getDataStats(
        res.vaccineStats,
        res.totalAppointment
      );
      setVaccineLabelStats(labelsVacc);
      setVaccineDataStats(dataVacc);

      setTotalAppointments(res.totalAppointment);
    });
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
