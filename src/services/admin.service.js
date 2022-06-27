const url = `http://localhost:8082/admin`;

const getStats = async (initialDate, lastDate) => {
  try {
    const resp = await fetch(url + "/get-stats", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        date1: initialDate,
        date2: lastDate,
      }),
    });

    const { stats } = await resp.json();

    return stats;
  } catch (err) {
    return false;
  }
};

const getStock = async (vacc, vaccCenter) => {
  try {
    const resp = await fetch(url + "/get-stock", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        vaccine: vacc,
        vaccinationCenter: vaccCenter,
      }),
    });

    const data = await resp.json();

    return data;
  } catch (err) {
    return false;
  }
};

const addStock = async (cant, vacc, vaccCenter) => {
  try {
    const resp = await fetch(url + "/add-stock", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        vaccine: vacc,
        vaccinationCenter: vaccCenter,
        cant: cant,
      }),
    });

    const data = await resp.json();

    return data;
  } catch (err) {
    return false;
  }
};

const getUserRenaper = async (dni) => {
  try {
    const resp = await fetch(
      `http://localhost:8082/users/get-user-renaper/${dni}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        credentials: "include",
      }
    );
    console.log(dni);
    const data = await resp.json();

    return data;
  } catch (err) {
    return false;
  }
};

const addPendingAppointment = async (cant, vacc, date) => {
  try {
    const resp = await fetch(url + "ACA VA EL ENDPOINT", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        vaccine: vacc,
        date: date,
        cant: cant,
      }),
    });

    const data = await resp.json();

    return data;
  } catch (err) {
    return false;
  }
};

export const AdminService = {
  getStats,
  getStock,
  addStock,
  getUserRenaper,
  addPendingAppointment,
};
