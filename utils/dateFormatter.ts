export const formatDateString = (isoString: string): string => {
  const date = new Date(isoString);

  const dateFormatter = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const formattedDate = dateFormatter.format(date);
  const formattedTime = timeFormatter.format(date);

  return `${formattedDate}, ${formattedTime.replace(".", ":")}`;
};
