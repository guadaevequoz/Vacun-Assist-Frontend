import React, { useState, useEffect } from "react";
import { AuthService } from "../services/auth.service";
import { NBar } from "./Navbar";

function Board() {
  /**
   * Pagina de bienvenida del usuario
   */
  const [usr, setUsr] = useState("");
  useEffect(() => {
    AuthService.getUser().then((res) => {
      setUsr(res);
    });
  }, []);

  console.log(usr);
  return (
    <>
      <NBar user={usr} />
      <p className="text">Bienvenido {usr.fullName} !</p>
    </>
  );
}
export default Board;
