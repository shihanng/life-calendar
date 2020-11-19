import React from "react";
import { useQueryParam, NumberParam, DateParam } from "use-query-params";
import { HeatMapGrid } from "react-grid-heatmap";
import dayjs from "dayjs";
import { generateData, dataToMatrix, Week } from "./helpers";

const weeksInRow = 52;

const xLabels = new Array(weeksInRow).fill(0).map((_, i) => `${i + 1}`);

const Preview = () => {
  const [years] = useQueryParam("y", NumberParam);
  const [fromDate] = useQueryParam("d", DateParam);

  const fromDateParsed = dayjs(!!fromDate ? fromDate : "");

  const rawData = generateData(fromDateParsed, dayjs(), years ? +years : 0);
  const values = rawData.map((d) => d.days);
  const valuesMatrix = dataToMatrix(values, weeksInRow);
  const rawDataMatrix = dataToMatrix(rawData, weeksInRow);

  const yLabels = rawDataMatrix.map((row: Week[]) => {
    return row[0].startDate.format("YYYY");
  });

  return (
    <div>
      <h1>Years {years}</h1>
      <h1>From {fromDate ? dayjs(fromDate).format("YYYY/M/D") : ""}</h1>
      <HeatMapGrid
        data={valuesMatrix}
        xLabels={xLabels}
        yLabels={yLabels}
        cellRender={(x, y, value) => (
          <div title={`Pos(${x}, ${y}) = ${value}`}></div>
        )}
        xLabelsStyle={(index) => ({
          color: index % 2 ? "transparent" : "#777",
          fontSize: ".7rem",
          margin: "1px 1px 1px 1px",
        })}
        yLabelsStyle={(index) => ({
          color: index % 2 ? "transparent" : "#777",
          fontSize: ".8rem",
          textTransform: "uppercase",
          margin: "1px 1px 1px 1px",
        })}
        cellStyle={(_x, _y, ratio) => ({
          background: `rgb(12, 160, 44, ${ratio})`,
          fontSize: ".8rem",
          color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`,
          borderWidth: "1px",
          borderColor: "black",
          margin: "1px 1px 1px 1px",
        })}
        cellHeight="12px"
        xLabelsPos="bottom"
        onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
        yLabelsPos="right"
        square
      />
    </div>
  );
};

export default Preview;
