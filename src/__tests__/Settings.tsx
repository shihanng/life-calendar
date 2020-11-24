import DayjsUtils from "@date-io/dayjs";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Settings from "../Settings";

test("changes in inputs should reflect in onChange", () => {
  const handleOnChange = jest.fn();

  const date = new Date(2020, 11, 1);

  render(
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <Settings years={0} fromDate={date} onChange={handleOnChange} />
    </MuiPickersUtilsProvider>
  );

  const yearInput = screen.getByPlaceholderText(/0/i);
  userEvent.type(yearInput, "10");

  expect(handleOnChange).toHaveBeenLastCalledWith(10, date);
});
