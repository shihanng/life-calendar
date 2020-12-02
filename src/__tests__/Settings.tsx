import DayjsUtils from "@date-io/dayjs";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "mutationobserver-shim";
import React from "react";
import Settings from "../Settings";

global.MutationObserver = window.MutationObserver;

test("changes in inputs should reflect in onChange", async () => {
  const handleOnChange = jest.fn((y, d) => {
    return Promise.resolve({ y, d });
  });

  const years = "20";
  const fromDate = "2000-11-01";

  render(
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <Settings years="" fromDate="" onChange={handleOnChange} />
    </MuiPickersUtilsProvider>
  );

  userEvent.type(screen.getByPlaceholderText(/120/i), years);

  fireEvent.input(screen.getByTestId(/from-date/i), {
    target: {
      value: fromDate,
    },
  });

  fireEvent.submit(screen.getByText(/^go$/i));

  await waitFor(() => {
    expect(handleOnChange).toHaveBeenLastCalledWith(years, fromDate);
  });
});
