import {
  waitFor,
  fireEvent,
  render as rtlRender,
  screen,
  RenderOptions,
} from "@testing-library/react";
import "mutationobserver-shim";
import React from "react";
import { QueryParamProvider } from "use-query-params";
import App from "../App";

global.MutationObserver = window.MutationObserver;

function render(
  ui: React.ReactElement,
  search = "",
  renderOptions?: RenderOptions
) {
  const location = {
    protocol: "http:",
    host: "localhost",
    pathname: "/",
    search: search,
  } as Location;

  const wrapper: React.ComponentType = ({ children }) => {
    return (
      <QueryParamProvider location={location}>{children}</QueryParamProvider>
    );
  };

  const {
    getByPlaceholderText,
    getByTestId,
    queryAllByTitle,
    ...r
  } = rtlRender(ui, {
    wrapper: wrapper,
    ...renderOptions,
  });

  return {
    yearsInput: getByPlaceholderText(/90/i),
    fromDateInput: getByTestId(/from-date/i),
    submitButton: screen.getByText(/^go$/i),
    heatmap: screen.queryAllByTitle(/^Pos\(\d+, \d+\)/),
    ...r,
  };
}

test("should show number of squares based on inputs", async () => {
  const { yearsInput, fromDateInput, submitButton, heatmap, rerender } = render(
    <App />,
    `?y=10&d=1985-04-24`
  );

  await waitFor(() => {
    expect(heatmap).toHaveLength(523);
  });

  fireEvent.input(yearsInput, {
    target: {
      value: "12",
    },
  });

  fireEvent.input(fromDateInput, {
    target: {
      value: "2010-10-10",
    },
  });

  fireEvent.submit(submitButton);

  await waitFor(() => {
    rerender(<App />);
  });

  await waitFor(() => {
    expect(screen.queryAllByTitle(/^Pos\(\d+, \d+\)/)).toHaveLength(627);
  });
});

test("should not show heatmap in initial state", async () => {
  const { heatmap } = render(<App />);

  await waitFor(() => {
    expect(heatmap).toHaveLength(0);
  });
});
