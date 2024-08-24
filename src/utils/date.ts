import {
  differenceInDays,
  parseISO,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  format,
} from "date-fns";

function calculateDifferenceInNights(from: string, to: string): number {
  let fromDate = parseISO(from);
  let toDate = parseISO(to);

  // Normalizar las fechas al comienzo del día
  fromDate = setHours(
    setMinutes(setSeconds(setMilliseconds(fromDate, 0), 0), 0),
    0
  );
  toDate = setHours(
    setMinutes(setSeconds(setMilliseconds(toDate, 0), 0), 0),
    0
  );

  const difference = differenceInDays(toDate, fromDate);

  return difference;
}

function formatDateWithoutTime(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export { calculateDifferenceInNights, formatDateWithoutTime };
