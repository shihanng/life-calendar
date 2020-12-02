import { render, screen } from "@testing-library/react";
import "mutationobserver-shim";
import React from "react";
import Preview from "../Preview";

global.MutationObserver = window.MutationObserver;

test("changes in inputs should set query parameter", async () => {
  render(<Preview years={"10"} fromDate={"1985-04-24"} />);

  const items = await screen.findAllByTitle(/^Pos\(\d+, \d+\)/);
  expect(items).toHaveLength(523);
});
