import { useEffect } from "react";
import { Card } from "react-bootstrap";
/**
 * Muesta una lista de los turnos asignados que tiene un usario paciente
 * @param {*} data Es toda la informacion sobre un turno especifico
 * @param {*} key Identificador del turno
 * @returns Retorna una "Card" con la informacion de un turno espeficico
 */
export const AppointmentsList = ({ data }, key) => {
  //Sin el useEffect aparece un Dia: vacio. ¿Porque? ni idea
  useEffect(() => {}, [data]);
  const date = data.vaccinationDate
    ? data.vaccinationDate.split("T", 1)
    : "A confirmar";
  return (
    <>
      <Card style={{ width: "500px", margin: "10px auto" }}>
        <Card.Header>
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
