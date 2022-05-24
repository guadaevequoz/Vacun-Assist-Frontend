//Arreglar las Keys
import { Button, Card } from "react-bootstrap";
import { useState } from "react";
import AppointmentValidation from "./AppointmentValidation";

export const VaccList = ({ data }, key) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card>
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
            <Button variant="success" onClick={handleShow}>
              Validar
            </Button>
            <AppointmentValidation
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
