import DayjsUtils from "@date-io/dayjs";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  fireEvent,
  render as rtlRender,
  RenderOptions,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import faker from "faker";
import "mutationobserver-shim";
import React from "react";
import Settings, { MAX_AGE } from "../Settings";

global.MutationObserver = window.MutationObserver;

function createYears(min = 0, max = MAX_AGE) {
  return `${faker.random.number({ min, max })}`;
}

function createFromDate() {
  return dayjs(faker.date.recent()).format("YYYY-MM-DD");
}

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

  const yearsInput = screen.getByPlaceholderText(/90/i);
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
  const years = createYears();
  const fromDate = createFromDate();

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
  const years = createYears(MAX_AGE, MAX_AGE + 100);

  const { handleOnChange, yearsInput, submitButton } = renderSettings(
    createYears(),
    createFromDate()
  );

  userEvent.type(yearsInput, years);

  fireEvent.submit(submitButton);

  await waitFor(() => {
    expect(screen.getByText(/should be lower than/i)).toBeInTheDocument();
    expect(handleOnChange).toHaveBeenCalledTimes(0);
  });
});
