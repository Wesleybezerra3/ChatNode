function formatDate(date) {
  const options = {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
  };
  return new Date(date).toLocaleString("pt-BR", options);
}
export default formatDate;



