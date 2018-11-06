import React from "react";
import styled from "styled-components";

import { WidgetContainer, WidgetTitle } from "./styled";
import DoughnutChart from "./DoughnutChart";

const StatusWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const Status = styled.div`
  font-family: "Maison Neue";
  font-size: 14px;
  line-height: 17px;
`;

const Percent = styled.p`
  opacity: 0.5;
`;

export interface StatusProps {
  width?: string,
  mt?: number,
  title?: string,
  librariesStatus: {
    totalUsed: number,
    upToDate: number
  }
}
export default ({
  width,
  mt,
  title,
  librariesStatus: { totalUsed, upToDate }
}: StatusProps) => {
  const outDated = totalUsed - upToDate;
  const outDatedPercent = Math.round(outDated / totalUsed * 100 * 10) / 10;
  const upToDatePercent = Math.round(upToDate / totalUsed * 100 * 10) / 10;
  return (
    <WidgetContainer mt={mt} width={width}>
      <WidgetTitle>{title || "Libraries Status"}</WidgetTitle>
      <StatusWrapper>
        <Status>
          Outdated<Percent>{outDatedPercent}%</Percent>
        </Status>
        <DoughnutChart percent={outDatedPercent} />
        <Status>
          Up to Date<Percent>{upToDatePercent}%</Percent>
        </Status>
      </StatusWrapper>
    </WidgetContainer>
  );
};
