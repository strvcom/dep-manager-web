import React from "react";
import { Outdated, Alerts } from "./styled";
import { TableCellProps } from "react-virtualized";

export interface StatusCellProps extends TableCellProps {
  cellData?: { outDated: number, alerts: number }
}
export default ({cellData = {alerts: 0, outDated: 0}}: StatusCellProps) => (
  <div>
    <Outdated count={cellData.outDated}>{cellData.outDated} Outdated</Outdated>{" "}
    <Alerts count={cellData.alerts}>{cellData.alerts} Alerts</Alerts>
  </div>
);
