import { generateData, dataToMatrix } from "../helpers";
import dayjs from "dayjs";

test("test generateData", () => {
  const data = generateData(dayjs("2020-12-25"), dayjs("2020-12-25"), 1);
  expect(data).toHaveLength(53);
  expect(data[0]).toEqual({
    startDate: dayjs("2020-12-20"),
    days: 1,
  });
  expect(data[1]).toEqual({
    startDate: dayjs("2020-12-27"),
    days: 0,
  });
});

test("test dataToMatrix", () => {
  const matrix = dataToMatrix([1, 2, 3, 4, 5], 3);
  expect(matrix).toEqual([
    [1, 2, 3],
    [4, 5],
  ]);
});

test("test dataToMatrix single row", () => {
  const matrix = dataToMatrix([1, 2, 3, 4, 5], 8);
  expect(matrix).toEqual([[1, 2, 3, 4, 5]]);
});
