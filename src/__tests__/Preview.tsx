import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Preview from "../Preview";
import { QueryParamProvider } from "use-query-params";

test("changes in inputs should set query parameter", () => {
  const location = {
    protocol: "http:",
    host: "localhost",
    pathname: "/",
    search: "?d=2020-11-20&y=10",
  } as Location;

  const { getByText } = render(
    <QueryParamProvider location={location}>
      <Preview />
    </QueryParamProvider>
  );

  const years = getByText(/years/i);
  expect(years).toHaveTextContent("Years 10");

  const from = getByText(/from/i);
  expect(from).toHaveTextContent(
    "From Fri Nov 20 2020 00:00:00 GMT+0900 (Japan Standard Time)"
  );
});
