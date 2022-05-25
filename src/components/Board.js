import React, { useState, useEffect } from "react";
import { AuthService } from "../services/auth.service";
import { NBar } from "./Navbar";
import { useNavigate } from "react-router-dom";

function Board() {
  /**
   * Pagina de bienvenida del usuario
   */
  const navigate = useNavigate();
  const [usr, setUsr] = useState("");
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
