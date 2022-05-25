/**
 * Componente del inicio de sesión del usuario
 */
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthService } from "../services/auth.service";

function LogIn() {
  const navigate = useNavigate();

  const [inputDniValue, setInputDniValue] = useState("");
  const [inputPasswordValue, setInputPasswordValue] = useState("");
  const [inputCodeValue, setInputCodeValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [loadingValue, setLoadingValue] = useState(false);

  /**
   *
   * @param {*} e representa el evento.
   * Esta función maneja el envio cuando termino de completar el formulario y envio. Se activa el loading del botón.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    setMessageValue("");
    setLoadingValue(true);
    /**
     * Envio los inputs al servicio que se conecta con la API y recibo su respuesta.
     */
    AuthService.login(inputDniValue, inputCodeValue, inputPasswordValue).then(
      (res) => {
        if (res.data.status === "fail") {
          setInputDniValue("");
          setInputPasswordValue("");
          setInputCodeValue("");
          setMessageValue(res.data.message);
          setLoadingValue(false);
        } else {
          navigate("/board");
        }
      }
    );
  };

  /**
   *
   * @param {*} e representa el evento.
   * Esta funcion maneja el cambio cada vez que ingreso un dato en los inputs y actualiza el estado del componente.
   */

  const handleDniChange = (e) => {
    setInputDniValue(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setInputPasswordValue(e.target.value);
  };
  const handleCodeChange = (e) => {
    setInputCodeValue(e.target.value);
  };

  return (
    <>
      <form className="form-login" onSubmit={handleSubmit}>
        <h1> Bienvenido! </h1>
        <h3>Inicia sesión para poder acceder a tu cuenta!</h3>
        <input
          type="number"
          name="dni"
          value={inputDniValue}
          onChange={handleDniChange}
          placeholder="Ingresa tu DNI."
          className="form-control"
          min={5000000}
          max={90000000}
          required
        ></input>
        <input
          type="number"
          name="token"
          value={inputCodeValue}
          onChange={handleCodeChange}
          placeholder="Ingresa tu token."
          className="form-control"
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
          className="form-control"
          minLength={"8"}
          required
        ></input>
        <button type="submit" className="btn btn-light btn-block">
          {loadingValue && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          <span>Iniciar sesión</span>
        </button>
        <p className="message">
          No tenes una cuenta aún? <Link to="/signup"> Registrate! </Link>
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
