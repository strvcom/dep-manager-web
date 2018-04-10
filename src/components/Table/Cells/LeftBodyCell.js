import React from "react";
import { Cell } from "../styled";

const LeftBodyCell = repoNames => ({ columnIndex, key, rowIndex, style }) => {
  const evenRow = rowIndex % 2 === 0 && columnIndex % 2 === 0;

  return (
    <Cell greyBg={evenRow} key={key} style={style}>
      {repoNames[rowIndex]}
    </Cell>
  );
};

export default LeftBodyCell;
