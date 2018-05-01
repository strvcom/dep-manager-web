import React from "react";
import styled from "styled-components";

import RelatedLibraries from "../../components/Tables/RelatedLibraries";
import { Status, RecentUpdates } from "../../components/Widgets";

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

export default ({ relatedLibraries, history, match, recentLibraries }) => {
  return (
    <Wrapper>
      <Content>
        <h2>Project libraries</h2>
        <div>
          <span>All</span>
          <span>Outdated</span>
          <input placeholder="Search for libraries" />
        </div>
        <RelatedLibraries
          relatedLibraries={relatedLibraries}
          history={history}
          match={match}
        />
      </Content>
      <Sidebar>
        <RecentUpdates
          match={match}
          recentLibraries={recentLibraries.filter(
            lib =>
              relatedLibraries.filter(rel => rel.libraryName === lib.name)
                .length
          )}
        />
        <Status
          mt={20}
          librariesStatus={{
            totalUsed: relatedLibraries.length,
            upToDate: relatedLibraries.filter(lib => lib.status === "upToDate")
              .length
          }}
        />
      </Sidebar>
    </Wrapper>
  );
};
