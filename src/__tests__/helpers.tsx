import { generateDataArray } from "../helpers";

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
