import { useEffect } from "react";
import { Card } from "react-bootstrap";

/**
 * Muesta una lista de los turnos asignados que tiene un usario paciente
 * @param {*} data Es toda la informacion sobre un turno especifico
 * @param {*} key Identificador del turno
 * @returns Retorna una "Card" con la informacion de un turno espeficico
 */
export const AppointmentsList = ({ data }, key) => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  //Sin el useEffect aparece un Dia: vacio. ¿Porque? ni idea
  useEffect(() => {}, [data]);
  let newDate = new Date(data.vaccinationDate);
  const date = data.vaccinationDate
    ? newDate.getDate() +
      " de " +
      months[newDate.getMonth()] +
      " de " +
      newDate.getFullYear()
    : "A confirmar";
  return (
    <>
      <Card style={{ width: "500px", margin: "10px auto" }}>
        <Card.Header
          style={{
            backgroundColor: `${
              data.vaccine === "Covid"
                ? "#B7E5DD"
                : data.vaccine === "Gripe"
                ? "rgba(188, 250, 92)"
                : "#ffef82"
            }`,
          }}
        >
          <Card.Title>Vacuna: {data.vaccine}</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="list-group-item"> Día: {date}</div>
          <div className="list-group-item">
            Estado:{" "}
            {data.state === "Finalizado"
              ? "Turno concretado ✅"
              : data.state === "Activo"
              ? "Turno pendiente ⌛"
              : data.state === "Pendiente"
              ? "En espera ⛔"
              : "Turno cancelado ❌"}
          </div>
          <div className="list-group-item">
            Vacunatorio: {data.vaccinationCenter}
          </div>
        </Card.Body>
      </Card>
      <br />
    </>
  );
};
