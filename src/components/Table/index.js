// @flow
import * as React from "react";
import { ScrollSync } from "react-virtualized";

import Loading from "../Loading";
import { Wrapper } from "./styled";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";

export default class Table extends React.PureComponent<*, *> {
  render() {
    const { data: { groups, libs, repos } } = this.props;
    if (!repos) {
      return <Loading />;
    }
    if (repos.length < 2) {
      return <div>Empty</div>;
    }
    return (
      <ScrollSync>
        {({ onScroll, scrollLeft, scrollTop }) => {
          return (
            <Wrapper>
              <LeftContainer repos={repos} scrollTop={scrollTop} />
              <RightContainer
                groups={groups}
                libs={libs}
                repos={repos}
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
