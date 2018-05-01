// @flow
import React from "react";
import { Outdated, Alerts } from "./styled";

export default ({
  cellData
}: {
  cellData: { outDated: number, alerts: number }
}) => (
  <div>
    <Outdated count={cellData.outDated}>{cellData.outDated} Outdated</Outdated>{" "}
    <Alerts count={cellData.alerts}>{cellData.alerts} Alerts</Alerts>
  </div>
);
