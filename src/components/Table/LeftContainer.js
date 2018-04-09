import React from "react";
import { Grid } from "react-virtualized";
import scrollbarSize from "dom-helpers/util/scrollbarSize";
import cn from "classnames";
import { LeftContainerWrapper } from "./styled";

const Header = data => ({ columnIndex, key, rowIndex, style }) => {
  return (
    <div className={"headerCell"} key={key} style={style}>
      {rowIndex === 0 && "Groups"}
      {rowIndex === 1 && "Library"}
      {rowIndex === 2 && "latest"}
    </div>
  );
};

const Left = repos => ({ columnIndex, key, rowIndex, style }) => {
  const rowClass =
    rowIndex % 2 === 0
      ? columnIndex % 2 === 0 ? "evenRow" : "oddRow"
      : columnIndex % 2 !== 0 ? "evenRow" : "oddRow";
  const classNames = cn(rowClass, "cell");

  return (
    <div className={classNames} key={key} style={style}>
      {repos[rowIndex][columnIndex]}
    </div>
  );
};

const LeftContainer = ({ groups, libs, repos, scrollTop }) => {
  return (
    <LeftContainerWrapper>
      <Grid
        cellRenderer={Header()}
        className={"HeaderGrid"}
        width={200}
        height={120}
        rowHeight={40}
        columnWidth={200}
        rowCount={3}
        columnCount={1}
      />
      <Grid
        overscanColumnCount={0}
        overscanRowCount={5}
        cellRenderer={Left(repos)}
        columnWidth={200}
        columnCount={1}
        className={"LeftSideGrid"}
        height={300 - scrollbarSize()}
        rowHeight={40}
        rowCount={repos.length}
        scrollTop={scrollTop}
        width={200}
      />
    </LeftContainerWrapper>
  );
};

export default LeftContainer;
