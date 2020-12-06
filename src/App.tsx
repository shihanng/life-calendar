import DayjsUtils from "@date-io/dayjs";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { RouteComponentProps } from "@reach/router";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { StringParam, useQueryParam } from "use-query-params";
import Preview from "./Preview";
import Settings from "./Settings";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
  },
  icon: {
    color: theme.palette.text.primary,
  },
}));

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
    setYears(years);
    setFromDate(fromDate);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid alignItems="center" direction="column" container justify="center">
        <MuiPickersUtilsProvider utils={DayjsUtils}>
          <Settings
            years={years ? years : ""}
            fromDate={fromDate ? fromDate : ""}
            onChange={handleOnChange}
          />
        </MuiPickersUtilsProvider>
        <Preview
          years={years ? years : ""}
          fromDate={fromDate ? fromDate : ""}
        />
      </Grid>
      <footer className={classes.footer}>
        <Grid
          spacing={3}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="body2">
              &copy; Copyright {`${dayjs().format("YYYY")}`}, Shi Han NG
            </Typography>
          </Grid>
          <Grid item>
            <a href="https://twitter.com/shihanng">
              <TwitterIcon className={classes.icon} />
            </a>
          </Grid>
          <Grid item>
            <a href="https://github.com/shihanng/life-count-down">
              <GitHubIcon className={classes.icon} />
            </a>
          </Grid>
        </Grid>
      </footer>
    </div>
  );
}

export default App;
