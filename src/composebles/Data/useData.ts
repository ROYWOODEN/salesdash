export function useData() {
    const date = new Date();

    const formatDate: string = date
  .toLocaleDateString("ru", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  .split(".")
  .reverse()
  .join("-");

  return formatDate;
}