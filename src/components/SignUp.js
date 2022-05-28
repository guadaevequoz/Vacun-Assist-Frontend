import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthService } from "../services/auth.service";

/**
 * Funcion que permite registrar un usuario paciente
 * @returns Retorna un formulario para registrar a un ususario paciente
 */
function SignUp() {
  const navigate = useNavigate();

  const [inputDniValue, setInputDniValue] = useState("");
  const [inputPasswordValue, setInputPasswordValue] = useState("");
  const [inputMailValue, setInputMailValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [loadingValue, setLoadingValue] = useState(false);
  const [inputGenderValue, setInputGenderValue] = useState("");
  const [inputTramitValue, setInputTramitValue] = useState("");

  /**
   * Función que maneja el envio de datos cuando termino de completar el formulario SignUp
   * @param {*} e representa el evento.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    reset();

    setMessageValue("");
    setLoadingValue(true);
    AuthService.signup(
      inputDniValue,
      inputMailValue,
      inputGenderValue,
      inputTramitValue,
      inputPasswordValue + ""
    ).then((res) => {
      if (res.data.status === "fail") {
        setInputDniValue("");
        setInputPasswordValue("");
        setInputMailValue("");
        setInputGenderValue("");
        setInputTramitValue("");
        setMessageValue(res.data.message);
        setLoadingValue(false);
      } else {
        navigate("/confirm");
      }
    });
  };

  /**
   * Funcion que maneja el cambio de "InputDni"
   * @param {*} e representa el evento.
   */
  const handleDniChange = (e) => {
    setInputDniValue(e.target.value);
  };

  /**
   * Funcion que maneja el cambio de "InputGender"
   * @param {*} e representa el evento.
   */
  const handleGenderChange = (e) => {
    setInputGenderValue(e.target.value);
  };

  /**
   * Funcion que maneja el cambio de "InputTramit"
   * @param {*} e representa el evento.
   */
  const handleTramitChange = (e) => {
    setInputTramitValue(e.target.value);
  };

  /**
   * Funcion que maneja el cambio de "InputPassword"
   * @param {*} e representa el evento.
   */
  const handlePasswordChange = (e) => {
    setInputPasswordValue(e.target.value);
  };

  /**
   * Funcion que maneja el cambio de "InputMail"
   * @param {*} e representa el evento.
   */
  const handleMailChange = (e) => {
    setInputMailValue(e.target.value);
  };

  /**
   * Funcion que resetea los valores de "InputGender"
   */
  const reset = () => {
    const gender = document.getElementById("gender");
    gender.selectedIndex = 0;
  };

  return (
    <>
      <form className="form-login" onSubmit={handleSubmit}>
        <h3 className="form-login-signup-header">
          Por favor completá estos datos para continuar.
        </h3>
        <input
          type="number"
          name="dni"
          value={inputDniValue}
          onChange={handleDniChange}
          placeholder="Ingresa tu DNI."
          min={"1000000"}
          s
          max={"999999999999999999"}
          required
        ></input>
        <input
          type="number"
          name="tramit"
          value={inputTramitValue}
          onChange={handleTramitChange}
          placeholder="Ingresa tu número de tramite."
          required
        ></input>
        <input
          type="email"
          name="email"
          value={inputMailValue}
          onChange={handleMailChange}
          placeholder="Ingresa tu mail."
          required
        ></input>
        <input
          type="password"
          name="pass"
          value={inputPasswordValue}
          onChange={handlePasswordChange}
          placeholder="Ingresa tu contraseña."
          minLength={"8"}
          required
        ></input>
        <label htmlFor="gender">Ingrese su sexo</label>
        <select
          className="form-select"
          onChange={handleGenderChange}
          id="gender"
          name="gender"
          required
        >
          <option></option>
          <option value="F">Femenino</option>
          <option value="M">Masculino</option>
        </select>
        <button type="submit">
          {loadingValue && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          <span>Registrarse</span>
        </button>
        <p className="message">
          ¿Ya tenes una cuenta? <Link to="/login"> ¡Inicia sesión! </Link>
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
