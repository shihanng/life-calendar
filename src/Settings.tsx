import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { DatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import React, { useState } from "react";

interface Props {
  years: number;
  fromDate: Date;
  onChange: (years?: number, fromDate?: Date) => void;
}

const Settings = (props: Props) => {
  const { onChange, ...rest } = props;

  const [years, setYears] = useState(rest.years);
  const [fromDate, setFromDate] = useState(rest.fromDate);

  const handleYearsOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const years = +event.target.value;
    setYears(years);
    onChange(years, fromDate);
  };

  const handleFromDateOnChange = (date: MaterialUiPickersDate) => {
    const newDate = date ? date.startOf("day").toDate() : new Date();
    setFromDate(newDate);
    onChange(years, newDate);
  };

  return (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item>
        <TextField
          id="years"
          value={years}
          onChange={handleYearsOnChange}
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
          value={fromDate}
          variant="inline"
          onChange={handleFromDateOnChange}
          data-testid="from-date"
        />
      </Grid>
    </Grid>
  );
};

export default Settings;
