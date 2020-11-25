import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import React from "react";
import { QueryParamProvider } from "use-query-params";
import App from "./App";

test("renders learn react link", async () => {
  const date = dayjs("1985-04-24", "YYYY-MM-DD", true);
  const location = {
    protocol: "http:",
    host: "localhost",
    pathname: "/",
    search: `?d=${date.format("YYYY-MM-DD")}`,
  } as Location;

  const { rerender } = render(
    <QueryParamProvider location={location}>
      <App />
    </QueryParamProvider>
  );

  const yearInput = screen.getByPlaceholderText(/0/i);
  userEvent.type(yearInput, "10");

  userEvent.click(screen.getByTestId(/from-date/i));
  userEvent.click(
    screen.queryAllByText(/^1$/, { selector: "p.MuiTypography-root" })[0]
  );

  rerender(
    <QueryParamProvider>
      <App />
    </QueryParamProvider>
  );

  const items = await screen.findAllByTitle(/^Pos\(\d+, \d+\)/);
  expect(items).toHaveLength(522);
});
