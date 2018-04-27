// @flow
import React from "react";
import styled, { keyframes } from "styled-components";

import { WidgetContainer, WidgetTitle } from "./styled";

const grow = width => keyframes`
  from {
    width: 0%;
  }
  to {
    width: ${width}%;
  }
`;

const BarChart = styled.div`
  position: relative;
  margin: 48px 0 24px;
  height: 4px;
  background-color: rgba(17, 21, 23, 0.15);
  &::after {
    content: "";
    display: block;
    position: absolute;
    background-color: #111517;
    top: 0;
    left: 0;
    height: 4px;
    animation: ${({ fill }) => grow(fill || 0)} 1s ease forwards;
  }
`;

const Status = styled.section`
  display: flex;
  justify-content: space-between;
  font-family: "Maison Neue";
  font-size: 14px;
  line-height: 17px;
`;

const Count = styled.span`
  opacity: 0.5;
  color: #000000;
  font-family: "Microsoft Sans Serif";
  line-height: 16px;
`;

export default ({
  width,
  projectOverview: { total, active }
}: {
  width: string,
  projectOverview: { total: number, active: number }
}) => (
  <WidgetContainer width={width}>
    <WidgetTitle>Projects Overview</WidgetTitle>
    <BarChart fill={active / total * 100} />
    <Status>
      <div>
        Active <Count>{active}</Count>
        &nbsp;&nbsp;&nbsp;&nbsp; Archived&nbsp;<Count>{total - active}</Count>
      </div>
      <div>
        Total <Count>{total}</Count>
      </div>
    </Status>
  </WidgetContainer>
);
