// @flow
import React, { Fragment } from "react";
import { AutoSizer } from "react-virtualized";
import scrollbarSize from "dom-helpers/util/scrollbarSize";
import { RightContainerWrapper, HeaderGrid, BodyGrid } from "./styled";
import { RightHeaderCell, RightBodyCell } from "./Cells";

type Props = {|
  groups: [],
  libs: [],
  versions: [],
  scrollLeft: number,
  onScroll: Function
|};

const RightContainer = ({
  groups,
  libs,
  versions,
  scrollLeft,
  onScroll
}: Props) => {
  const columnWidth = 120;
  return (
    <RightContainerWrapper>
      <AutoSizer>
        {({ height, width }) => (
          <Fragment>
            <HeaderGrid
              cellRenderer={RightHeaderCell(groups, libs)}
              columnCount={libs.length}
              width={width - scrollbarSize()}
              columnWidth={columnWidth}
              rowCount={3}
              height={120}
              rowHeight={40}
              scrollLeft={scrollLeft}
              overscanColumnCount={0}
            />
            <BodyGrid
              cellRenderer={RightBodyCell(versions)}
              columnCount={libs.length}
              width={width}
              columnWidth={columnWidth}
              rowCount={versions.length}
              height={height}
              rowHeight={40}
              onScroll={onScroll}
              overscanColumnCount={0}
              overscanRowCount={5}
            />
          </Fragment>
        )}
      </AutoSizer>
    </RightContainerWrapper>
  );
};

export default RightContainer;
