import React from "react";
import { AuthService } from "../services/auth.service";
import { NBar } from "./Navbar";

function Board() {
  /**
   * Pagina de bienvenida del usuario
   */

  const { usr } = AuthService.getCurrentUser();
  console.log("Board", usr);
  return (
    <>
      <NBar user={usr} />
      <p className="text">Bienvenido {usr.fullName} !</p>
    </>
  );
}
export default Board;
