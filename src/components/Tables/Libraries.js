// @flow
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AutoSizer, Table, Column, SortDirection } from "react-virtualized";

import StatusCell from "./StatusCell";
import { Wrapper } from "./styled";

export default ({ history, match: { params }, libraries }) => (
  <Wrapper>
    <AutoSizer>
      {({ width, height }) => (
        <Table
          width={width}
          height={height}
          headerHeight={50}
          rowHeight={75}
          rowClassName={({ index }) => index >= 0 && "row"}
          rowCount={libraries.length}
          rowGetter={({ index }) => libraries[index]}
          onRowClick={({ rowData }) => {
            history.push(`/${params.department}/library/${rowData.name}`);
          }}
        >
          <Column width={380} label="Name" dataKey="name" />
          <Column width={200} label="Group" dataKey="group" />
          <Column width={180} label="Total Used On" dataKey="totalUsed" />
          <Column
            width={360}
            label="Outdated"
            dataKey="status"
            cellRenderer={StatusCell}
          />
        </Table>
      )}
    </AutoSizer>
  </Wrapper>
);
