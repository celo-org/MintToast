export const formatDateFromString = (dateString: string) => {
  // format of dateString is DD/MM/YYYY
  let [day, month, year] = dateString.split("/");
  const dateObj = new Date(+year, +month - 1, +day);
  return dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
