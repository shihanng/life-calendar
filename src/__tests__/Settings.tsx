import React from "react";
import { render } from "@testing-library/react";
import Settings from "../Settings";

test("renders learn react link", () => {
  const { getByLabelText } = render(<Settings />);
  const input = getByLabelText("years");
  expect(input).toHaveAttribute("type", "number");
});
