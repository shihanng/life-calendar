import React from "react";
import Settings from "./Settings";
import Preview from "./Preview";
import { RouteComponentProps } from "@reach/router";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DayjsUtils from "@date-io/dayjs";

function App(_: RouteComponentProps) {
  return (
    <div>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <Container maxWidth="md">
          <Settings />
          <Preview />
        </Container>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;
