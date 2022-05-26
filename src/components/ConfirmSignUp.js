import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth.service";

/**
 * Formulario donde ingresar el token para validar el registro de un usuario paciente
 * @returns un formulario donde ingresar  el token
 */
const ConfirmSignUp = () => {
  const navigate = useNavigate();
  const [inputCodeValue, setInputCodeValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [loadingValue, setLoadingValue] = useState(false);

  /**
   * Esta funcion maneja el envio del formulario para completar el registro con el token
   * @param {*} e respresenta el evento
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    AuthService.confirm(inputCodeValue).then(({ data }) => {
      if (data.status === "fail") {
        setInputCodeValue("");
        setMessageValue(data.message);
        setLoadingValue(false);
      } else {
        const usr = data.data.usr;
        AuthService.login(usr.dni, usr.code, usr.password).then(() => {
          navigate("/board");
        });
      }
    });
  };

  /**
   * Esta funcion maneja el cambio cada vez que ingreso un dato en los inputs y actualiza el estado del componente.
   * @param {*} e representa el evento
   */
  const handleCodeChange = (e) => {
    setInputCodeValue(e.target.value);
  };

  return (
    <>
      <form className="form-login" onSubmit={handleSubmit}>
        <h3>Ingresa el código numerico que recibiste en tu mail. </h3>
        <input
          type="number"
          name="token"
          value={inputCodeValue}
          onChange={handleCodeChange}
          placeholder="Ingresa tu código."
          required
        ></input>
        <button type="submit">
          {loadingValue && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          <span>Confirmar</span>
        </button>
        {messageValue && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {messageValue}
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default ConfirmSignUp;
