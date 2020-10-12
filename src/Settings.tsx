import React, { useState } from "react";

const Settings = () => {
  const [years, setYears] = useState(10);
  const [fromDate, setFromDate] = useState(new Date());

  return (
    <div>
      <label htmlFor="years">
        <input
          id="years"
          value={years}
          type="number"
          onChange={(e) => setYears(+e.target.value)}
        />
        years
      </label>{" "}
      <label htmlFor="years">
        from
        <input
          type="date"
          value={`${fromDate.getFullYear()}-${
            fromDate.getMonth() + 1
          }-${fromDate.getDate()}`}
          onChange={(e) => setFromDate(new Date(e.target.value))}
        />
      </label>
    </div>
  );
};

export default Settings;
