import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Settings from "../Settings";
import { QueryParamProvider } from "use-query-params";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DayjsUtils from "@date-io/dayjs";

test("changes in inputs should set query parameter", () => {
  render(
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <QueryParamProvider>
        <Settings />
      </QueryParamProvider>
    </MuiPickersUtilsProvider>
  );

  const yearInput = screen.getByPlaceholderText(/0/i);
  userEvent.type(yearInput, "10");

  userEvent.click(screen.getByDisplayValue(/October 10th/i));
  userEvent.click(screen.getByText(/^2020$/));
  userEvent.click(screen.getByText(/^1990$/));
  userEvent.click(screen.getByText(/^24$/));

  expect(window.location.search).toEqual("?d=1990-10-24&y=10");
});
