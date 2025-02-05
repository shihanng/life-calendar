import dayjs from "dayjs";
import React from "react";
import { HeatMapGrid } from "react-grid-heatmap";
import { dataToMatrix, generateData, Week } from "./helpers";
import Grid from "@material-ui/core/Grid";

const weeksInRow = 52;

interface Props {
  years: string;
  fromDate: string;
}

const Preview = (props: Props) => {
  const { years, fromDate } = props;

  const rawData = generateData(dayjs(fromDate, "YYYY-MM-DD"), dayjs(), +years);
  const values = rawData.map((d) => d.days);
  const valuesMatrix = dataToMatrix(values, weeksInRow);
  const rawDataMatrix = dataToMatrix(rawData, weeksInRow);

  const xLabels = new Array(weeksInRow).fill(0).map((_, i) => `${i + 1}`);
  const yLabels = rawDataMatrix.map((row: Week[]) => {
    return row[0].startDate.format("YYYY");
  });

  return (
    <Grid>
      {values.length > 0 && (
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
          cellHeight="13px"
          xLabelsPos="bottom"
          onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
          yLabelsPos="right"
          square
        />
      )}
    </Grid>
  );
};

export default Preview;
