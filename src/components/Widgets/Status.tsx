import React from 'react'
import { WidgetContainer, WidgetTitle } from './styled'
import DoughnutChart from './DoughnutChart'
import {StatusWrapper, StatusContainer, Percent} from './styled'

const Status = ({
  width,
  mt,
  title,
  librariesStatus: { totalUsed, upToDate },
}: StatusProps) => {
  const outDated = totalUsed - upToDate
  const outDatedPercent = Math.round((outDated / totalUsed) * 100 * 10) / 10
  const upToDatePercent = Math.round((upToDate / totalUsed) * 100 * 10) / 10
  return (
    <WidgetContainer mt={mt} width={width}>
      <WidgetTitle>{title || 'Libraries Status'}</WidgetTitle>
      <StatusWrapper>
        <StatusContainer>
          Outdated
          <Percent>{outDatedPercent}%</Percent>
        </StatusContainer>
        <DoughnutChart percent={outDatedPercent} />
        <StatusContainer>
          Up to Date
          <Percent>{upToDatePercent}%</Percent>
        </StatusContainer>
      </StatusWrapper>
    </WidgetContainer>
  )
}

export interface StatusProps {
  width?: string
  mt?: number
  title?: string
  librariesStatus: {
    totalUsed: number
    upToDate: number
  }
}

export default React.memo(Status)
