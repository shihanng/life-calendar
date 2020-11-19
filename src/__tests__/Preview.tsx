import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Preview from "../Preview";
import { QueryParamProvider } from "use-query-params";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

test("changes in inputs should set query parameter", () => {
  const date = dayjs("1985-04-24", "YYYY-MM-DD", true);
  const location = {
    protocol: "http:",
    host: "localhost",
    pathname: "/",
    search: `?d=${date.format("YYYY-MM-DD")}&y=10`,
  } as Location;

  const { getByText } = render(
    <QueryParamProvider location={location}>
      <Preview />
    </QueryParamProvider>
  );

  const years = getByText(/years/i);
  expect(years).toHaveTextContent("Years 10");

  const from = getByText(/from/i);
  expect(from).toHaveTextContent(`From ${date.format("YYYY/M/D")}`);
});
