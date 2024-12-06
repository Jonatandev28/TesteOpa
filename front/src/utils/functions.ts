const formatDate = (date: Date): string => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const oneDayMillis = 24 * 60 * 60 * 1000;

  // Calcular "ontem"
  const yesterday = new Date(today.getTime() - oneDayMillis);

  // Diferença em milissegundos
  const diffMillis =
    today.getTime() -
    new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

  // Formatar hora e minuto
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}`;

  if (diffMillis === 0) {
    // Hoje
    return `hoje, ${timeString}`;
  } else if (diffMillis === oneDayMillis) {
    // Ontem
    return `ontem, ${timeString}`;
  } else if (diffMillis <= 7 * oneDayMillis) {
    // Dentro de uma semana, retorna o nome do dia
    const daysOfWeek = [
      "domingo",
      "segunda",
      "terça",
      "quarta",
      "quinta",
      "sexta",
      "sábado",
    ];
    return `${daysOfWeek[date.getDay()]}, ${timeString}`;
  } else {
    // Mais de uma semana atrás
    return `1 semana, ${timeString}`;
  }
};

const generateRandomNumber = () => {
  return Math.floor(Math.random() * 10000);
};

export { formatDate, generateRandomNumber };
