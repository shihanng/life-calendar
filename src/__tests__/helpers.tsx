import { generateDataArray, generateData } from "../helpers";
import dayjs from "dayjs";

test("boundaries and bins are same", () => {
  const data = generateDataArray(1, 10, 10, 3, 8);
  expect(data).toEqual([0, 0, 100, 100, 100, 100, 100, 100, 0, 0]);
});

test("5 bins", () => {
  const data = generateDataArray(1, 10, 5, 3, 8);
  expect(data).toEqual([0, 50, 100, 100, 0]);
});

test("start and end are also boundaries", () => {
  const data = generateDataArray(1, 10, 10, 1, 10);
  expect(data).toEqual([100, 100, 100, 100, 100, 100, 100, 100, 100, 100]);
});

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
