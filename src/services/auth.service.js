/**
 * Servicio que se conecta con la API, enviando los datos de usuarios y recibiendo su respectiva respuesta.
 */
const url = `http://localhost:8082/users`;

const login = async (dni, token, pass) => {
  try {
    const resp = await fetch(url + "/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        dni: dni,
        code: token,
        password: pass,
      }),
      credentials: "include",
    });

    const data = await resp.json();

    return { data };
  } catch (err) {
    return false;
  }
};

const logout = async () => {
  try {
    const resp = await fetch(url + "/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    const { data } = await resp.json();

    return data;
  } catch (err) {
    return false;
  }
};

const signup = async (dni, email, pass) => {
  try {
    const resp = await fetch(url + "/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        dni: dni,
        email: email,
        password: pass,
      }),
      credentials: "include",
    });

    const data = await resp.json();

    return { data };
  } catch (err) {
    return false;
  }
};

const confirm = async (token) => {
  try {
    const resp = await fetch(url + "/signup-confirm", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
      credentials: "include",
    });

    const data = await resp.json();

    return { data };
  } catch (err) {
    return false;
  }
};

//tomar el usuario loggeado
const getUser = async () => {
  try {
    const resp = await fetch(url + "/get-logged-user", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    const { data } = await resp.json();

    return data;
  } catch (err) {
    return false;
  }
};

//ingresar datos de salud
const uploadHealthData = async (isRisk) => {
  try {
    const resp = await fetch(url + "/healthData", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        isRisk: isRisk,
      }),
      credentials: "include",
    });
    //Arreglo temporal --> El Back deberia devolver un objeto "data:{usr:{datos}}", en vez de un objeto "data:{datos}"
    const { data: usr } = await resp.json();

    return { usr };
  } catch (err) {
    return false;
  }
};

export const AuthService = {
  login,
  logout,
  signup,
  confirm,
  getUser,
  uploadHealthData,
};
