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

const signup = async (dni, email, gender, tramit, pass) => {
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
        gender: gender,
        tramit: tramit,
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

//dado un DNI tomo el el usuario al que le pertenece
const getUserByDNI = async (dni) => {
  try {
    const resp = await fetch(url + `/get-user/${dni}`, {
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
    return err;
  }
};

const signupVaccinator = async (dni, email, vaccCenter) => {
  try {
    const resp = await fetch(url + "/signup-vacc", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        dni: dni,
        email: email,
        vaccinationCenter: vaccCenter,
      }),
      credentials: "include",
    });

    const data = await resp.json();

    return { data };
  } catch (err) {
    return false;
  }
};

const setCompletedAppointment = async (vacc, vaccDate) => {
  try {
    const resp = await fetch(url + "/vaccineAplication", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        vaccine: vacc,
        vaccinationDate: vaccDate,
      }),
      credentials: "include",
    });

    const data = await resp.json();
    console.log(data);
    return { data };
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
  getUserByDNI,
  signupVaccinator,
  setCompletedAppointment,
};
