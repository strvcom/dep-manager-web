import React from "react";
import { VersionInfo } from "../styled";

const RightBodyCell = repos => ({ columnIndex, key, rowIndex, style }) => {
  if (columnIndex < 1) {
    return;
  }
  const d = repos[rowIndex][columnIndex];
  if (d) {
    return (
      <VersionInfo status={d.status} key={key} style={style}>
        {d.version}
      </VersionInfo>
    );
  }
  return null;
};

export default RightBodyCell;
