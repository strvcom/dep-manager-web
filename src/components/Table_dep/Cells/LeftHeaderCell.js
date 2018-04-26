import React from "react";
import { Cell } from "../styled";

const LeftHeaderCell = ({ columnIndex, key, rowIndex, style }) => {
  return (
    <Cell bold key={key} style={style}>
      {rowIndex === 0 && "Groups"}
      {rowIndex === 1 && "Library"}
      {rowIndex === 2 && "latest"}
    </Cell>
  );
};

export default LeftHeaderCell;
