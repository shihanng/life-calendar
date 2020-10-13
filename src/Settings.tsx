import React from "react";
import { useQueryParam, NumberParam, DateParam } from "use-query-params";

const Settings = () => {
  const [years, setYears] = useQueryParam("y", NumberParam);
  const [fromDate, setFromDate] = useQueryParam("d", DateParam);

  return (
    <div>
      <label htmlFor="years">
        <input
          id="years"
          value={years ? years : 0}
          type="number"
          onChange={(e) => setYears(+e.target.value)}
        />
        years
      </label>{" "}
      <label htmlFor="years">
        from
        <input
          type="date"
          value={
            fromDate
              ? `${fromDate.getFullYear()}-${
                  fromDate.getMonth() + 1
                }-${fromDate.getDate()}`
              : "10-10-2020"
          }
          onChange={(e) => setFromDate(new Date(e.target.value))}
        />
      </label>
    </div>
  );
};

export default Settings;
