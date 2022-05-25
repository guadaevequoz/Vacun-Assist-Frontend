/**
 * Componenete del registrar usuario
 */
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { AuthService } from "../services/auth.service";

function SignUp() {
  const navigate = useNavigate();

  const [inputDniValue, setInputDniValue] = useState("");
  const [inputPasswordValue, setInputPasswordValue] = useState("");
  const [inputMailValue, setInputMailValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [loadingValue, setLoadingValue] = useState(false);

  /**
   *
   * @param {*} e representa el evento.
   * Esta función maneja el envio cuando termino de completar el formulario y envio. Se activa el loading del botón.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    AuthService.signup(
      inputDniValue,
      inputMailValue,
      inputPasswordValue + ""
    ).then((res) => {
      if (res.data.status === "fail") {
        setInputDniValue("");
        setInputPasswordValue("");
        setInputMailValue("");
        setMessageValue(res.data.message);
        setLoadingValue(false);
      } else {
        navigate("/confirm");
      }
    });
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
  const handleMailChange = (e) => {
    setInputMailValue(e.target.value);
  };

  return (
    <>
      <form className="form-login" onSubmit={handleSubmit}>
        <h1>Crea tu cuenta </h1>
        <h3>Por favor completá estos datos para continuar.</h3>
        <input
          type="number"
          name="dni"
          value={inputDniValue}
          onChange={handleDniChange}
          placeholder="Ingresa tu DNI."
          className="form-control"
          required
        ></input>
        <input
          type="email"
          name="email"
          value={inputMailValue}
          onChange={handleMailChange}
          placeholder="Ingresa tu mail."
          className="form-control"
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
          <span>Registrarse</span>
        </button>
        <p className="message">
          Ya tenes una cuenta? <Link to="/login"> Inicia sesión! </Link>
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

export default SignUp;
