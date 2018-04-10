import React from "react";
import { VersionInfo } from "../styled";

const RightBodyCell = versions => ({ columnIndex, key, rowIndex, style }) => {
  const d = versions[rowIndex][columnIndex];
  const evenRow = rowIndex % 2 === 0;
  if (d) {
    return (
      <VersionInfo greyBg={evenRow} status={d.status} key={key} style={style}>
        {d.version}
      </VersionInfo>
    );
  }
  return null;
};

export default RightBodyCell;
