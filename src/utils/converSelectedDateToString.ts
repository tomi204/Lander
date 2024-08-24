const convertSelectedDateToString = (startDateStr: string, endDateStr: string) => {
  const parseDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day));
  };

  const startDate = startDateStr ? parseDate(startDateStr) : null;
  const endDate = endDateStr ? parseDate(endDateStr) : null;

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      timeZone: "UTC",
    });

  const dateString = startDate ? formatDate(startDate) : "";
  const endDateString = endDate ? ` - ${formatDate(endDate)}` : "";

  return dateString + endDateString;
};

export default convertSelectedDateToString;
