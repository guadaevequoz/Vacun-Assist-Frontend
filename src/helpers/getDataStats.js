export default (dataStats, total, colors) => {
  let array = [];
  let array2 = [];
  for (const element in dataStats) {
    array = [...array, element];
    const value = (dataStats[element] / total) * 100;
    array2 = [...array2, value];
  }

  const data = {
    labels: array,
    datasets: [
      {
        data: array2,
        backgroundColor: colors,
      },
    ],
  };
  return data;
};
