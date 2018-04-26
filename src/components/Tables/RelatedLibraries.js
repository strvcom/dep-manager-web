// @flow
import React from "react";
import { AutoSizer, Table, Column, SortDirection } from "react-virtualized";
import styled from "styled-components";

import { Wrapper } from "./styled";

const CurrentVersion = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 2px;
  line-height: 20px;

  ${({ status }) => {
    switch (status) {
      case "major":
        return `
          background-color: #ffd1d9;
          color: #ef0d33;
        `;
      case "minor":
        return `
          background-color: #ffefbb;
          color: #c2950b;
        `;
      default:
        return "color: inherit";
    }
  }};
`;

export default ({ history, match: { params }, relatedLibraries }) => (
  <Wrapper>
    <AutoSizer>
      {({ width, height }) => (
        <Table
          width={width}
          height={height}
          headerHeight={50}
          rowHeight={75}
          rowClassName={({ index }) => index >= 0 && "row"}
          rowCount={relatedLibraries.length}
          rowGetter={({ index }) => relatedLibraries[index]}
          onRowClick={({ rowData }) => {
            history.push(
              `/${params.department}/library/${rowData.libraryName}`
            );
          }}
        >
          <Column width={280} label="Library Name" dataKey="libraryName" />
          <Column width={180} label="Latest version" dataKey="latestVersion" />
          <Column
            width={180}
            label="Current version"
            dataKey="currentVersion"
            cellRenderer={({ cellData, rowData }) => (
              <CurrentVersion status={rowData.status}>
                {cellData}
              </CurrentVersion>
            )}
          />
          <Column width={100} label="Licence" dataKey="licence" />
        </Table>
      )}
    </AutoSizer>
  </Wrapper>
);
