import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { KeyboardDatePicker } from "@material-ui/pickers";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface Props {
  years: string;
  fromDate: string;
  onChange: (years?: string, fromDate?: string) => void;
}

type Inputs = {
  years: string;
  fromDate: string;
};

export const MAX_AGE = 150;

const Settings = (props: Props) => {
  const { onChange, ...rest } = props;
  const { register, trigger, handleSubmit, errors, control } = useForm<Inputs>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = ({ years, fromDate }: Inputs) => {
    onChange(years, fromDate);
  };

  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item>
          <TextField
            name="years"
            defaultValue={rest.years}
            placeholder="120"
            inputRef={register({
              pattern: {
                value: /^[0-9]+$/,
                message: "Should be Integer Number",
              },
              validate: {
                maxVal: (value) =>
                  +value < MAX_AGE || `Should be Lower Than ${MAX_AGE}`,
              },
            })}
            error={!!errors.years}
            helperText={errors.years?.message}
          />
        </Grid>
        <Grid item>
          <Typography variant="button" gutterBottom>
            years from
          </Typography>
        </Grid>
        <Grid item>
          <Controller
            name="fromDate"
            control={control}
            defaultValue={rest.fromDate}
            render={(props) => (
              <KeyboardDatePicker
                value={null}
                inputValue={props.value}
                variant="inline"
                onChange={(_, v) => props.onChange(v)}
                inputProps={{ "data-testid": "from-date" }}
                inputRef={register}
                format="YYYY-MM-DD"
              />
            )}
          />
        </Grid>
        <Grid item>
          <Button size="small" type="submit" variant="contained">
            Go
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Settings;
