import React, { useState, useEffect } from "react";
import { AuthService } from "../services/auth.service";
import { NBar } from "./Navbar";
import { useNavigate } from "react-router-dom";
/**
 * Pagina principal del ususario
 * @returns Retorna la barra de navegacion dependiendo del usuario conectado
 */
function Board() {
  const navigate = useNavigate();
  const [usr, setUsr] = useState("");

  //Se renderiza "Board" solo una vez
  useEffect(() => {
    AuthService.getUser().then((res) => {
      if (res) setUsr(res);
      else navigate("/login");
    });
  }, []);

  return (
    <div className="section-container">
      <NBar user={usr} />
      <p>Bienvenido {usr.fullName}!</p>
      {usr.rol === "admin" ? (
        <p>
          Como <b>administrador</b> próximamente podrás: obtener un listado de
          todos los turnos registrado en el sistema junto con estádisticas,
          agregar stock de vacunas y registrar vacunadores.
        </p>
      ) : usr.rol === "vacc" ? (
        <p>
          Como <b>vacunador</b> podrás: obtener un listado de todos los turnos
          del día y registrar el resultado de un turno.
        </p>
      ) : (
        <p>Dentro de VacunAssist podrás: sacar turnos para tus vacunas.</p>
      )}
    </div>
  );
}
export default Board;
