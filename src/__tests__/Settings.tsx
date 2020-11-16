import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Settings from "../Settings";
import { QueryParamProvider } from "use-query-params";

test("change in years input should set query parameter", () => {
  const { getByLabelText } = render(
    <QueryParamProvider>
      <Settings />
    </QueryParamProvider>
  );
  const input = getByLabelText(/years/i);

  expect(input).toHaveAttribute("type", "number");
  fireEvent.change(input, { target: { value: "10" } });
  expect(window.location.search).toEqual("?y=10");
});
