import DayjsUtils from "@date-io/dayjs";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { RouteComponentProps } from "@reach/router";
import React, { useEffect, useState } from "react";
import { StringParam, useQueryParam } from "use-query-params";
import Preview from "./Preview";
import Settings from "./Settings";

function App(_: RouteComponentProps) {
  const [qy, setQy] = useQueryParam("y", StringParam);
  const [qd, setQd] = useQueryParam("d", StringParam);

  const [years, setYears] = useState<string | undefined | null>(qy);
  const [fromDate, setFromDate] = useState<string | undefined | null>(qd);

  useEffect(() => {
    setQy(years);
    setQd(fromDate);
  }, [years, fromDate, setQy, setQd]);

  const handleOnChange = (years?: string, fromDate?: string) => {
    setYears(years ? years : undefined);
    setFromDate(fromDate ? fromDate : undefined);
  };

  return (
    <div>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <Container maxWidth="md">
          <Settings
            years={years ? years : ""}
            fromDate={fromDate ? fromDate : ""}
            onChange={handleOnChange}
          />
          <Preview
            years={years ? years : ""}
            fromDate={fromDate ? fromDate : ""}
          />
        </Container>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;
