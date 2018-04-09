import React from "react";
import { AutoSizer, Grid } from "react-virtualized";
import scrollbarSize from "dom-helpers/util/scrollbarSize";
import cn from "classnames";
import { VersionInfo } from "./styled";

const HeaderCell = (groups, libs) => ({
  columnIndex,
  key,
  rowIndex,
  style
}) => {
  if (columnIndex < 1) {
    return;
  }
  if (rowIndex === 0) {
    return (
      <div className={"headerCell"} key={key} style={style}>
        {/* {`C${columnIndex}`} */}
        {/* Groups */}
        {groups[columnIndex]}
      </div>
    );
  }
  if (rowIndex === 1) {
    return (
      <div className={"headerCell"} key={key} style={style}>
        {/* {`C${columnIndex}`} */}
        {libs[columnIndex] ? libs[columnIndex].name : `C${columnIndex}`}
        {/* {libs[columnIndex] */}
      </div>
    );
  }
  return (
    <div className={"headerCell"} key={key} style={style}>
      {/* {`C${columnIndex}`} */}
      {libs[columnIndex] ? libs[columnIndex].version : `C${columnIndex}`}
      {/* {libs[columnIndex].version} */}
    </div>
  );
};

const BodyCell = repos => ({ columnIndex, key, rowIndex, style }) => {
  if (columnIndex < 1) {
    return;
  }

  const rowClass =
    rowIndex % 2 === 0
      ? columnIndex % 2 === 0 ? "evenRow" : "oddRow"
      : columnIndex % 2 !== 0 ? "evenRow" : "oddRow";
  const classNames = cn(rowClass, "cell");

  const d = repos[rowIndex][columnIndex];
  if (d) {
    return (
      <VersionInfo status={d.status} key={key} style={style}>
        {d.version}
      </VersionInfo>
    );
  }
  return (
    <div className={classNames} key={key} style={style}>
      {`R${rowIndex}, C${columnIndex}`}
    </div>
  );
};

const RightContainer = ({
  groups,
  libs,
  repos,
  scrollTop,
  scrollLeft,
  onScroll
}) => {
  return (
    <div className={"GridColumn"}>
      <AutoSizer disableHeight>
        {({ width }) => (
          <div>
            <div
              style={{
                backgroundColor: `black`,
                color: "white",
                height: 120,
                width: width - scrollbarSize()
              }}
            >
              <Grid
                className={"HeaderGrid"}
                columnWidth={75}
                columnCount={libs.length}
                height={120}
                overscanColumnCount={0}
                cellRenderer={HeaderCell(groups, libs)}
                rowHeight={40}
                rowCount={3}
                scrollLeft={scrollLeft}
                width={width - scrollbarSize()}
              />
            </div>
            <div
              style={{
                backgroundColor: "white",
                color: "black",
                height: 300,
                width
              }}
            >
              <Grid
                className={"BodyGrid"}
                columnWidth={75}
                columnCount={libs.length}
                height={300}
                onScroll={onScroll}
                overscanColumnCount={0}
                overscanRowCount={5}
                cellRenderer={BodyCell(repos)}
                rowHeight={40}
                rowCount={repos.length}
                width={width}
              />
            </div>
          </div>
        )}
      </AutoSizer>
    </div>
  );
};

export default RightContainer;
