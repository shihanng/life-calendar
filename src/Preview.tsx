import React from "react";
import { useQueryParam, NumberParam, DateParam } from "use-query-params";

const Preview = () => {
  const [years] = useQueryParam("y", NumberParam);
  const [fromDate] = useQueryParam("d", DateParam);

  return (
    <div>
      <h1>Years {years}</h1>
      <h1>From {fromDate?.toString()}</h1>
    </div>
  );
};

export default Preview;
