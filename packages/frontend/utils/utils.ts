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

// convert the timestamp into date and then retuen the time elapsed from now till the date
// ago add months and years old later
export const formatTimestampToTimeElapsedForm = (timestamp: number) => {
  const dateObj = new Date(timestamp * 1000);
  const now = new Date();
  const diff = now.getTime() - dateObj.getTime();
  const diffYears = Math.floor(diff / (1000 * 3600 * 24 * 30 * 12));
  const diffMonths = Math.floor(diff / (1000 * 3600 * 24 * 30));
  const diffDays = Math.floor(diff / (1000 * 3600 * 24));
  const diffHours = Math.floor(diff / (1000 * 3600));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);
  if (diffMonths > 0) {
    return `${diffMonths}m ago`;
  } else if (diffYears > 0) {
    return `${diffYears}y ago`;
  } else if (diffDays > 0) {
    return `${diffDays}d ago`;
  } else if (diffHours > 0) {
    return `${diffHours}h ago`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes}m ago`;
  } else if (diffSeconds > 0) {
    return `${diffSeconds}s ago`;
  } else {
    return "now";
  }
};
