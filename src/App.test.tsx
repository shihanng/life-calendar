import React from "react";
import { render } from "@testing-library/react";
import { QueryParamProvider } from "use-query-params";
import App from "./App";

test("renders learn react link", () => {
  const { getByText } = render(
    <QueryParamProvider>
      <App />
    </QueryParamProvider>
  );
  const divElement = getByText(/years from/i);
  expect(divElement).toBeInTheDocument();
});
