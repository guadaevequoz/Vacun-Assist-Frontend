export default (dataStats, total, colors, borderColor, borderWidht) => {
  let labels = [];
  let array = [];
  for (const element in dataStats) {
    labels = [...labels, element];
    const value = (dataStats[element] / total) * 100;
    array = [...array, value];
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: array,
        backgroundColor: colors,
        borderColor: borderColor,
        borderWidht: borderWidht,
      },
    ],
  };
  return data;
};
