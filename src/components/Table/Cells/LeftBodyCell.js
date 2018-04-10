import React from "react";
import { Cell, LibCount } from "../styled";

const LeftBodyCell = repoNames => ({ columnIndex, key, rowIndex, style }) => {
  const evenRow = rowIndex % 2 === 0 && columnIndex % 2 === 0;

  return (
    <Cell greyBg={evenRow} key={key} style={style}>
      {repoNames[rowIndex].name} <br />
      <LibCount>({repoNames[rowIndex].usedLibraryCount} libraries)</LibCount>
    </Cell>
  );
};

export default LeftBodyCell;
