import { render, screen } from "@testing-library/react";
import React from "react";
import Preview from "../Preview";

test("changes in inputs should set query parameter", async () => {
  render(<Preview years={10} fromDate={new Date(1985, 3, 24)} />);

  const items = await screen.findAllByTitle(/^Pos\(\d+, \d+\)/);
  expect(items).toHaveLength(523);
});
