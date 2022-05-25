import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const SetAppointmentConfirm = ({ show, handleClose, data }) => {
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (data) setDate(data);
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    navigate("/board");
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Tu turno fue sacado con exito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Presentate en tu vacunatorio el dia {date} para poder vacunarte
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-validate" type="submit" onClick={handleSubmit}>
            Ok
          </Button>
          <hr />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SetAppointmentConfirm;
