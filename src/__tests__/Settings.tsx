import DayjsUtils from "@date-io/dayjs";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  fireEvent,
  render as rtlRender,
  screen,
  waitFor,
  RenderOptions,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "mutationobserver-shim";
import React from "react";
import Settings from "../Settings";

global.MutationObserver = window.MutationObserver;

function render(ui: React.ReactElement, renderOptions?: RenderOptions) {
  const wrapper: React.ComponentType = ({ children }) => {
    return (
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        {children}
      </MuiPickersUtilsProvider>
    );
  };

  return rtlRender(ui, { wrapper: wrapper, ...renderOptions });
}

function renderSettings(years: string, fromDate: string) {
  const handleOnChange = jest.fn((y, d) => {
    return Promise.resolve({ y, d });
  });

  const r = render(
    <Settings years={years} fromDate={fromDate} onChange={handleOnChange} />
  );

  const yearsInput = screen.getByPlaceholderText(/120/i);
  const fromDateInput = screen.getByTestId(/from-date/i);
  const submitButton = screen.getByText(/^go$/i);

  return {
    ...r,
    handleOnChange,
    yearsInput,
    fromDateInput,
    submitButton,
  };
}

test("changes in inputs should reflect in onChange", async () => {
  const years = "20";
  const fromDate = "2000-11-01";

  const {
    handleOnChange,
    yearsInput,
    fromDateInput,
    submitButton,
  } = renderSettings("", "");

  userEvent.type(yearsInput, years);

  fireEvent.input(fromDateInput, {
    target: {
      value: fromDate,
    },
  });

  fireEvent.submit(submitButton);

  await waitFor(() => {
    expect(handleOnChange).toHaveBeenLastCalledWith(years, fromDate);
  });
});

test("years should not be greater than MAX_AGE", async () => {
  const years = "1000";

  const { handleOnChange, yearsInput, submitButton } = renderSettings(
    "10",
    "1985-04-24"
  );

  userEvent.type(yearsInput, years);

  fireEvent.submit(submitButton);

  await waitFor(() => {
    expect(screen.getByText(/should be lower than/i)).toBeInTheDocument();
    expect(handleOnChange).toHaveBeenCalledTimes(0);
  });
});
