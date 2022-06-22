import { AuthService } from "../../services/auth.service";
import { AdminService } from "../../services/admin.service";
import { useEffect, useState } from "react";
import { NBar } from "../Navbar";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../../css/stats.css";
import getDataStats from "../../helpers/getDataStats";

/**
 * Funcion que muestra en pantalla los turnos de un usuario paciente
 * @returns Retorna una lista con los turnos
 */
ChartJS.register(ArcElement, Tooltip, Legend);

const GetStats = () => {
  const navigate = useNavigate();
  const [usr, setUsr] = useState("");
  const [loadingValue, setLoadingValue] = useState(false);
  const [messageValue, setMessageValue] = useState("");
  const [initMessage, setInitMessage] = useState(true);

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

  const [initialDate, setInitialDate] = useState(undefined);
  const [lastDate, setLastDate] = useState(undefined);

  const dataDays = {
    labels: dayLabelStats,
    datasets: [
      {
        label: "# of Votes",
        data: dayDataStats,
        backgroundColor: [
          "rgba(255, 0, 0, 0.2)",
          "rgba(0, 255, 0, 0.2)",
          "rgba(0, 0, 255, 0.2)",
          "rgba(255, 255, 0, 0.2)",
          "rgba(255, 0, 255, 0.2)",
          "rgba(0,255,255,0.2)",
          "rgba(255, 130, 0, 0.2)",
        ],
        borderColor: [
          "rgba(255, 0, 0, 1)",
          "rgba(0, 255, 0, 1)",
          "rgba(0, 0, 255, 1)",
          "rgba(255, 255, 0, 1)",
          "rgba(255, 0, 255, 1)",
          "rgba(0,255,255,1)",
          "rgba(255, 130, 0, 1)",
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
          "rgba(255, 0, 0, 0.2)",
          "rgba(0, 255, 0, 0.2)",
          "rgba(0, 0, 255, 0.2)",
          "rgba(255, 255, 0, 0.2)",
        ],
        borderColor: [
          "rgba(255, 0, 0, 1)",
          "rgba(0, 255, 0, 1)",
          "rgba(0, 0, 255, 1)",
          "rgba(255, 255, 0, 1)",
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
          "rgba(255, 0, 0, 0.2)",
          "rgba(0, 255, 0, 0.2)",
          "rgba(0, 0, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 0, 0, 1)",
          "rgba(0, 255, 0, 1)",
          "rgba(0, 0, 255, 1)",
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
  }, []);

  const handleInitialDate = (e) => {
    setMessageValue("");
    setInitialDate(e.target.value);
  };
  const handleLastDate = (e) => {
    setMessageValue("");
    setLastDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Date.parse(lastDate) < Date.parse(initialDate)) {
      setMessageValue("La fecha final debe ser menor a la de inicio 😆");
    } else {
      AdminService.getStats(initialDate, lastDate).then((res) => {
        const { labels: labelsDays, data: dataDays } = getDataStats(
          res.daysStats,
          52
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
        setInitMessage(false);
      });
    }
  };

  return (
    <>
      <div className="section-container">
        <NBar user={usr} />
        <form className="form-stats" onSubmit={handleSubmit}>
          <h3>Ingrese un rango de fechas</h3>
          <input
            type="date"
            name="fechaInicio"
            id="initialDate"
            value={initialDate}
            onChange={handleInitialDate}
            required
          ></input>
          <input
            type="date"
            name="fechaFin"
            id="lastDate"
            value={lastDate}
            onChange={handleLastDate}
            required
          ></input>
          <button type="submit">
            {loadingValue && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Buscar</span>
          </button>
          {messageValue && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {messageValue}
              </div>
            </div>
          )}
        </form>
        {initMessage ? (
          <div>Ingrese un rango de fechas para visualizar las estadisticas</div>
        ) : (
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
        )}
      </div>
    </>
  );
};

export default GetStats;
