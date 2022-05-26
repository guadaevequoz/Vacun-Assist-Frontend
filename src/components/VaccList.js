import { Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import AppointmentValidation from "./AppointmentValidation";

/**
 * Funcion que muestra los turnos activos para un vacunatorio especifico
 * @param {*} loadAppointments Funcion que carga los turnos de un vacunatorio especifico
 *  @param {*} data Todos los datos de un turno especifico
 * @param {*} key Identificador de un turno especifico
 * @returns Retorna una "Card" con los datos de un turno y permite validarlo
 */
export const VaccList = ({ loadAppointments, data }, key) => {
  const [show, setShow] = useState(false);

  //Renderiza "VaccList" solo una vez
  useEffect(() => {});
  /**
   * Funcion que cierra el "Modal" del componenete "AppointmentValidation"
   */
  const handleClose = () => setShow(false);
  /**
   * Funcion que abre el "Modal" del componenete "AppointmentValidation"
   */
  const handleShow = () => setShow(true);
  return (
    <>
      <Card style={{ width: "500px", margin: "10px auto" }}>
        {data.state === "Activo" && (
          <>
            <Card.Header>
              <Card.Title>Vacuna: {data.vaccine}</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <div key={data._id + data.patientDni}>
                  DNI: {data.patientDni}
                </div>
              </Card.Text>
            </Card.Body>
            <Button className="validate-window-btn" onClick={handleShow}>
              Validar
            </Button>
            <AppointmentValidation
              loadAppointments={loadAppointments}
              show={show}
              handleClose={handleClose}
              id={data._id}
            />
          </>
        )}
      </Card>
      <br />
    </>
  );
};
