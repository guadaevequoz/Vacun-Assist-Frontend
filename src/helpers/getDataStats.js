export default (dataStats, total) => {
  let labels = [];
  let array = [];
  for (const element in dataStats) {
    labels = [...labels, element];
    const value = (dataStats[element] / total) * 100;
    array = [...array, value];
  }
  const data = {
    labels: labels,
    data: array,
  };
  return data;
};
