import React from "react";
import { render } from "@testing-library/react";
import Settings from "../Settings";
import { QueryParamProvider } from "use-query-params";

test("renders learn react link", () => {
  const { getByLabelText } = render(
    <QueryParamProvider>
      <Settings />
    </QueryParamProvider>
  );
  const input = getByLabelText("years");
  expect(input).toHaveAttribute("type", "number");
});
