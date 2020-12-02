import { waitFor, fireEvent, render, screen } from "@testing-library/react";
import dayjs from "dayjs";
import "mutationobserver-shim";
import React from "react";
import { QueryParamProvider } from "use-query-params";
import App from "./App";

global.MutationObserver = window.MutationObserver;

test("should show number of squares based on inputs", async () => {
  const date = dayjs("1985-04-24", "YYYY-MM-DD", true);
  const location = {
    protocol: "http:",
    host: "localhost",
    pathname: "/",
    search: `?y=10&d=${date.format("YYYY-MM-DD")}`,
  } as Location;

  const { rerender } = render(
    <QueryParamProvider location={location}>
      <App />
    </QueryParamProvider>
  );

  fireEvent.input(screen.getByPlaceholderText(/120/i), {
    target: {
      value: "12",
    },
  });

  fireEvent.input(screen.getByTestId(/from-date/i), {
    target: {
      value: "2010-10-10",
    },
  });

  fireEvent.submit(screen.getByText(/^go$/i));

  await waitFor(() => {
    rerender(
      <QueryParamProvider>
        <App />
      </QueryParamProvider>
    );
  });

  await waitFor(() => {
    const items = screen.queryAllByTitle(/^Pos\(\d+, \d+\)/);
    expect(items).toHaveLength(627);
  });
});
