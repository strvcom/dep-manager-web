// @flow
import React from "react";
import scrollbarSize from "dom-helpers/util/scrollbarSize";
import { AutoSizer } from "react-virtualized";

import { LeftContainerWrapper, HeaderGrid, LeftGrid } from "./styled";
import { LeftHeaderCell, LeftBodyCell } from "./Cells";

type Props = {|
  repoNames: [],
  scrollTop: number
|};

const LeftContainer = ({ repoNames, scrollTop }: Props) => {
  const columnWidth = 200;
  return (
    <LeftContainerWrapper>
      <HeaderGrid
        cellRenderer={LeftHeaderCell}
        columnCount={1}
        width={columnWidth}
        columnWidth={columnWidth}
        rowCount={3}
        height={120}
        rowHeight={40}
      />
      <AutoSizer disableWidth>
        {({ height }) => (
          <LeftGrid
            cellRenderer={LeftBodyCell(repoNames)}
            columnCount={1}
            width={columnWidth}
            columnWidth={columnWidth}
            rowCount={repoNames.length}
            height={height - scrollbarSize()}
            rowHeight={40}
            scrollTop={scrollTop}
            overscanColumnCount={0}
            overscanRowCount={5}
          />
        )}
      </AutoSizer>
    </LeftContainerWrapper>
  );
};

export default LeftContainer;
