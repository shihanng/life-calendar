import React from "react";
import { useQueryParam, NumberParam, DateParam } from "use-query-params";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { DatePicker } from "@material-ui/pickers";
import Typography from "@material-ui/core/Typography";

const Settings = () => {
  const [years, setYears] = useQueryParam("y", NumberParam);
  const [fromDate, setFromDate] = useQueryParam("d", DateParam);

  return (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item>
        <TextField
          id="years"
          value={years ? years : 0}
          onChange={(e) => setYears(+e.target.value)}
          placeholder="0"
        />
      </Grid>
      <Grid item>
        <Typography variant="button" gutterBottom>
          years from
        </Typography>
      </Grid>
      <Grid item>
        <DatePicker
          id="from-date"
          value={
            fromDate
              ? `${fromDate.getFullYear()}-${
                  fromDate.getMonth() + 1
                }-${fromDate.getDate()}`
              : "10-10-2020"
          }
          variant="inline"
          onChange={(e) => setFromDate(e ? e.toDate() : null)}
        />
      </Grid>
    </Grid>
  );
};

export default Settings;
