import React from "react";
import { AutoSizer, Table, Column } from "react-virtualized";

import StatusCell from "./StatusCell";
import { Wrapper } from "./styled";
import { RouteComponentProps } from "react-router";

export interface LibrariesProps extends RouteComponentProps<{department: string}> {
  libraries: any
}
export default ({ history, match: { params }, libraries }: LibrariesProps) => (
  <Wrapper>
    <AutoSizer disableHeight>
      {({ width }) => (
        <Table
          width={width}
          height={50 + 75 * libraries.length}
          headerHeight={50}
          rowHeight={75}
          rowClassName={({ index }) => index >= 0 ? "row" : ''}
          rowCount={libraries.length}
          rowGetter={({ index }) => libraries[index]}
          onRowClick={({ rowData }: any) => {
            history.push(
              `/${params.department}/library/${rowData.name.replace(
                "/",
                "%2f"
              )}`
            );
          }}
        >
          <Column width={380} label="Name" dataKey="name" />
          <Column width={200} label="Group" dataKey="group" />
          <Column width={180} label="Total Used On" dataKey="totalUsed" />
          <Column
            width={360}
            label="Outdated Projects"
            dataKey="status"
            cellRenderer={StatusCell}
          />
        </Table>
      )}
    </AutoSizer>
  </Wrapper>
);
