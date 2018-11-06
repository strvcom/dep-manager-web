import React from "react";
import styled from "styled-components";

import RelatedProjects from "../../components/Tables/RelatedProjects";
import { OutdatedProjects, Status } from "../../components/Widgets";
import { ProjectLibraryRelation } from "../../data/helpers";
import { RouteComponentProps } from "react-router";

const Wrapper = styled.section`
  margin-top: 60px;
  display: flex;
  flex: 1 1 auto;
`;

const Content = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`;

const Sidebar = styled.div`
  flex: 0 1 360px;
  margin-left: 35px;
`;

export interface LibraryDetailProps extends RouteComponentProps<{department: string}> {
  relatedProjects: ProjectLibraryRelation[]
}
export default ({ relatedProjects, ...routeProps }: LibraryDetailProps) => {
  return (
    <Wrapper>
      <Content>
        <h2>Library projects</h2>
        <div>
          <span>All</span>
          <input placeholder="Search for libraries" />
        </div>
        <RelatedProjects
          relatedProjects={relatedProjects}
          {...routeProps}
        />
      </Content>
      <Sidebar>
        <OutdatedProjects
          outDatedProjects={relatedProjects.filter(
            rel => rel.status !== "upToDate"
          )}
          {...routeProps}
        />
        <Status
          mt={20}
          title="Related Project Status"
          librariesStatus={{
            totalUsed: relatedProjects.length,
            upToDate: relatedProjects.filter(lib => lib.status === "upToDate")
              .length
          }}
        />
      </Sidebar>
    </Wrapper>
  );
};
