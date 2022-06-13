const url = `http://localhost:8082/admin`;

const getStats = async () => {
  try {
    const resp = await fetch(url + "/get-stats", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    const { stats } = await resp.json();

    return stats;
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

    const { stats } = await resp.json();

    return stats;
  } catch (err) {
    return false;
  }
};

export const AdminService = {
  getStats,
  addStock,
};