export default ({ street, state, number }) => {
  return (
    street +
    " " +
    number +
    ", " +
    state.charAt(0).toUpperCase() +
    state.slice(1)
  );
};
