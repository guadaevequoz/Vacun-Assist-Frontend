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
      <p className="text">Bienvenido {usr.fullName} !</p>
    </div>
  );
}
export default Board;
