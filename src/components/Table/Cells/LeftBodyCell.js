import React from "react";
import { Cell } from "../styled";

const LeftBodyCell = repos => ({ columnIndex, key, rowIndex, style }) => {
  const evenRow = rowIndex % 2 === 0 && columnIndex % 2 === 0;

  return (
    <Cell greyBg={evenRow} key={key} style={style}>
      {repos[rowIndex][columnIndex]}
    </Cell>
  );
};

export default LeftBodyCell;
