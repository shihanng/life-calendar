import DayjsUtils from "@date-io/dayjs";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import Preview from "./Preview";
import Settings from "./Settings";
import { useQueryParam, NumberParam, DateParam } from "use-query-params";

function App(_: RouteComponentProps) {
  const [years, setYears] = useQueryParam("y", NumberParam);
  const [fromDate, setFromDate] = useQueryParam("d", DateParam);

  const handleOnChange = (years?: number, fromDate?: Date) => {
    setYears(years);
    setFromDate(fromDate);
  };

  return (
    <div>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <Container maxWidth="md">
          <Settings
            years={years ? years : undefined}
            fromDate={fromDate ? fromDate : undefined}
            onChange={handleOnChange}
          />
          <Preview />
        </Container>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;
