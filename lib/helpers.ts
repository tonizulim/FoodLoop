export default function formatDateDayMonthTime(dateString: string) {
  const d = new Date(dateString);

  return `${d.getDate().toString().padStart(2, "0")}.${
    (d.getMonth() + 1).toString().padStart(2, "0")
  } ${d.getHours().toString().padStart(2, "0")}:${d
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}