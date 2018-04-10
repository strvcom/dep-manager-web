import React from "react";
import { VersionInfo } from "../styled";

const RightBodyCell = versions => ({ columnIndex, key, rowIndex, style }) => {
  const d = versions[rowIndex][columnIndex];
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
