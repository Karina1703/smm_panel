export function formattedDateTime(string) {
  const date = new Date(string);
  const formattedDate = date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("ru-RU", {
    hour: "numeric",
    minute: "numeric",
  });
  return `${formattedDate} ${formattedTime}`;
}
