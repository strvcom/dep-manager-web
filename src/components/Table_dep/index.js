// @flow
import * as React from "react";
import { ScrollSync } from "react-virtualized";

import Loading from "../Loading";
import { Wrapper } from "./styled";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";

export default class Table extends React.PureComponent<*, *> {
  render() {
    const { data: { groups, libs, repoNames, versions } } = this.props;
    if (!repoNames) {
      return <Loading />;
    }
    if (repoNames.length < 1) {
      return <div>Empty</div>;
    }
    return (
      <ScrollSync>
        {({ onScroll, scrollLeft, scrollTop }) => {
          return (
            <Wrapper>
              <LeftContainer repoNames={repoNames} scrollTop={scrollTop} />
              <RightContainer
                groups={groups}
                libs={libs}
                versions={versions}
                scrollLeft={scrollLeft}
                onScroll={onScroll}
              />
            </Wrapper>
          );
        }}
      </ScrollSync>
    );
  }
}
