// @flow
import React from "react";
import styled from "styled-components";

import { storiesOf } from "@storybook/react";

import "../src/globalStyles";

import {
  Overview,
  Status,
  DoughnutChart,
  RecentUpdates
} from "../src/components/Widgets";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: ${({ bg }) => bg || "grey"};
`;

storiesOf("Overview", module)
  .addDecorator(story => <Wrapper>{story()}</Wrapper>)
  .add("default", () => <Overview active={52} archived={380} />);

storiesOf("Status", module)
  .addDecorator(story => <Wrapper>{story()}</Wrapper>)
  .add("default", () => <Status outDated={10} upToDate={30} />);

storiesOf("RecentUpdates", module)
  .addDecorator(story => <Wrapper>{story()}</Wrapper>)
  .add("default", () => <RecentUpdates />);

storiesOf("DoughnutChart", module)
  .addDecorator(story => <Wrapper bg="white">{story()}</Wrapper>)
  .add("default", () => <DoughnutChart percent={35} />)
  .add("bigger size", () => <DoughnutChart size={80} />);
