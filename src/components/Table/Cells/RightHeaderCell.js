import React from "react";
import { Cell } from "../styled";

const RightHeaderCell = (groups, libs) => ({
  columnIndex,
  key,
  rowIndex,
  style
}) => {
  if (rowIndex === 0) {
    return (
      <Cell key={key} style={style}>
        {groups[columnIndex]}
      </Cell>
    );
  }
  if (rowIndex === 1) {
    return (
      <Cell key={key} style={style}>
        {libs[columnIndex].name}
      </Cell>
    );
  }
  return (
    <Cell key={key} style={style}>
      {libs[columnIndex].version}
    </Cell>
  );
};
export default RightHeaderCell;
