import React from "react";
import styled from "styled-components";
import { Link, RouteComponentProps } from "react-router-dom";

import { WidgetContainer, WidgetTitle } from "./styled";
import { ProjectLibraryRelation } from "../../data/helpers";

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

export interface OutdatedProjectsProps extends RouteComponentProps<{department: string}> {
  width?: string,
  height?: string,
  outDatedProjects: ProjectLibraryRelation[]
}
export default ({
  width,
  height,
  match: { params },
  outDatedProjects
}: OutdatedProjectsProps) => (
  <WidgetContainer height={height} width={width}>
    <WidgetTitle>Outdated on</WidgetTitle>
    <Libraries>
      {outDatedProjects.map(prj => (
        <LibraryLink
          to={`/${params.department}/project/${prj.projectName}`}
          key={prj.projectName}
        >
          <NameAndVersion>
            <span>{prj.projectName}</span>
            <span>{prj.currentVersion}</span>
          </NameAndVersion>
        </LibraryLink>
      ))}
    </Libraries>
  </WidgetContainer>
);
