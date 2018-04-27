// @flow
import React from "react";
import { AutoSizer, Table, Column } from "react-virtualized";

import { Wrapper, CurrentVersion } from "./styled";

export default ({ history, match: { params }, relatedProjects }) => (
  <Wrapper>
    <AutoSizer>
      {({ width, height }) => (
        <Table
          width={width}
          height={height}
          headerHeight={50}
          rowHeight={75}
          rowClassName={({ index }) => index >= 0 && "row"}
          rowCount={relatedProjects.length}
          rowGetter={({ index }) => relatedProjects[index]}
          onRowClick={({ rowData }) => {
            history.push(
              `/${params.department}/project/${rowData.projectName}`
            );
          }}
        >
          <Column width={280} label="Project Name" dataKey="projectName" />
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
        </Table>
      )}
    </AutoSizer>
  </Wrapper>
);
