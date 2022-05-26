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
  return (
    <>
      <Card style={{ width: "500px", margin: "10px auto" }}>
        <Card.Header>
          <Card.Title>Vacuna: {data.vaccine}</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="list-group-item">Día: {data.vaccinationDate}</div>
          <div className="list-group-item">Estado: {data.state}</div>
          <div className="list-group-item">
            Vacunatorio: {data.vaccinationCenter}
          </div>
        </Card.Body>
      </Card>
      <br />
    </>
  );
};
