// @flow
import React from "react";
import styled from "styled-components";
import { Link, RouteComponentProps } from "react-router-dom";
import { format } from "date-fns";

import { WidgetContainer, WidgetTitle } from "./styled";
import { Library } from "../../data/helpers";

const LibraryLink = styled(Link)`
  display: block;
  margin-top: 20px;
  padding-right: 20px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const Libraries = styled.div`
  overflow: auto;
  margin-right: -30px;
`;

const NameAndVersion = styled.div`
  font-family: "Maison Neue";
  font-size: 14px;
  line-height: 17px;
  display: flex;
  justify-content: space-between;
`;
const UpdatedTime = styled.span`
  opacity: 0.25;
  font-family: "Maison Neue";
  font-size: 11px;
  font-weight: 500;
  line-height: 13px;
`;

export default ({
  width,
  match: { params },
  recentLibraries
}: {
  width?: string,
  recentLibraries: Library[]
} & RouteComponentProps<{department: string}>) => (
  <WidgetContainer width={width}>
    <WidgetTitle>Recent Updates</WidgetTitle>
    <Libraries>
      {recentLibraries.map(lib => (
        <LibraryLink
          to={`/${params.department}/library/${lib.name.replace("/", "%2f")}`}
          key={lib.name}
        >
          <NameAndVersion>
            <span>{lib.name}</span>
            <span>{lib.version}</span>
          </NameAndVersion>
          <UpdatedTime>{format(lib.updatedAt, "MMM D, YYYY")}</UpdatedTime>
        </LibraryLink>
      ))}
    </Libraries>
  </WidgetContainer>
);
