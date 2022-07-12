export default (vaccinationDate) => {
  if (vaccinationDate) {
    const date = new Date(vaccinationDate);
    date.setHours(1);
    date.getMinutes(0);
    date.getSeconds(0);
    date.getMilliseconds(0);
    console.log(date);
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return `${date.getDate()} de ${
      months[date.getMonth()]
    } de ${date.getFullYear()} `;
  } else return undefined;
};
