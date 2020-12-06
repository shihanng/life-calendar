import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import weekday from "dayjs/plugin/weekday";
import { MAX_AGE } from "./Settings";

dayjs.extend(isSameOrBefore);
dayjs.extend(weekday);
dayjs.extend(isBetween);

export interface Week {
  startDate: Dayjs;
  days: number;
}

export const generateData = (
  startDate: Dayjs,
  todayDate: Dayjs,
  years: number
): Array<Week> => {
  if (years >= MAX_AGE) {
    return [];
  }

  const endDate = startDate.add(years, "year");

  let currentDate = startDate.weekday(0);
  let data: Array<Week> = [];

  while (currentDate.isSameOrBefore(endDate)) {
    if (currentDate.day() === 0) {
      data.push({ startDate: currentDate, days: 0 });
    }

    if (currentDate.isBetween(startDate, todayDate, null, "[]")) {
      data[data.length - 1].days++;
    }

    currentDate = currentDate.add(1, "day");
  }

  return data;
};

export function dataToMatrix<T>(data: T[], nPerRow: number): T[][] {
  let copyData = [...data];
  let matrix: T[][] = [];

  while (copyData.length) matrix.push(copyData.splice(0, nPerRow));

  return matrix;
}
