import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthService } from "../services/auth.service";

/**
 * Funcion que permite Iniciar sesion a un usuario
 * @returns Retorna un formulario para iniciar sesion
 */
function LogIn() {
  const navigate = useNavigate();

  const [inputDniValue, setInputDniValue] = useState("");
  const [inputPasswordValue, setInputPasswordValue] = useState("");
  const [inputCodeValue, setInputCodeValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [loadingValue, setLoadingValue] = useState(false);

  /**
   * Función que maneja el envio de datos cuando termino de completar el formulario LogIn
   * @param {*} e representa el evento.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    setMessageValue("");
    setLoadingValue(true);
    AuthService.login(inputDniValue, inputCodeValue, inputPasswordValue).then(
      (res) => {
        if (res.data.status === "fail") {
          setInputPasswordValue("");
          setMessageValue(res.data.message);
          setLoadingValue(false);
        } else {
          navigate("/board");
        }
      }
    );
  };

  /**
   * Funcion que maneja el cambio del "InputDni"
   * @param {*} e representa el evento.
   */
  const handleDniChange = (e) => {
    setInputDniValue(e.target.value);
  };
  /**
   * Funcion que maneja el cambio del "InputPassword"
   * @param {*} e representa el evento.
   */
  const handlePasswordChange = (e) => {
    setInputPasswordValue(e.target.value);
  };
  /**
   * Funcion que maneja el cambio del "InputCode"
   * @param {*} e representa el evento.
   */
  const handleCodeChange = (e) => {
    setInputCodeValue(e.target.value);
  };

  return (
    <>
      <form className="form-login" onSubmit={handleSubmit}>
        <h3 className="form-login-signup-header">
          Inicia sesión para poder acceder a tu cuenta.
        </h3>
        <input
          type="number"
          name="dni"
          value={inputDniValue}
          onChange={handleDniChange}
          placeholder="Ingresa tu DNI."
          min={5000000}
          max={90000000}
          required
        ></input>
        <input
          type="text"
          name="token"
          value={inputCodeValue}
          onChange={handleCodeChange}
          placeholder="Ingresa tu token."
          min={1000}
          max={9999}
          required
        ></input>
        <input
          type="password"
          name="pass"
          value={inputPasswordValue}
          onChange={handlePasswordChange}
          placeholder="Ingresa tu contraseña."
          required
        ></input>
        <button type="submit">
          {loadingValue && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          <span>Iniciar sesión</span>
        </button>
        <p className="message">
          ¿No tenes una cuenta? <Link to="/signup"> ¡Registrate! </Link>
        </p>
        {messageValue && (
          <div className="form-group message">
            <div className="alert alert-danger" role="alert">
              {messageValue}
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default LogIn;
