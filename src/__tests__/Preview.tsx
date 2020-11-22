import React from "react";
import { render, screen } from "@testing-library/react";
import Preview from "../Preview";
import { QueryParamProvider } from "use-query-params";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

test("changes in inputs should set query parameter", async () => {
  const date = dayjs("1985-04-24", "YYYY-MM-DD", true);
  const location = {
    protocol: "http:",
    host: "localhost",
    pathname: "/",
    search: `?d=${date.format("YYYY-MM-DD")}&y=10`,
  } as Location;

  render(
    <QueryParamProvider location={location}>
      <Preview />
    </QueryParamProvider>
  );

  const items = await screen.findAllByTitle(/^Pos\(\d+, \d+\)/);
  expect(items).toHaveLength(523);
});
