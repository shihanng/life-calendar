import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Settings from "../Settings";
import { QueryParamProvider } from "use-query-params";

test("changes in inputs should set query parameter", () => {
  const { getByLabelText } = render(
    <QueryParamProvider>
      <Settings />
    </QueryParamProvider>
  );

  const yearInput = getByLabelText(/years/i);
  expect(yearInput).toHaveAttribute("type", "number");
  fireEvent.change(yearInput, { target: { value: "10" } });

  const fromInput = getByLabelText(/from/i);
  expect(fromInput).toHaveAttribute("type", "date");
  fireEvent.change(fromInput, { target: { value: "2020-11-20" } });

  expect(window.location.search).toEqual("?d=2020-11-20&y=10");
});
