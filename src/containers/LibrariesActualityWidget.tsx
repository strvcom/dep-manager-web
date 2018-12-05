import React from 'react'
import {
  StatusWrapper,
  StatusContainer,
  Percent
} from '../routes/Dashboard/widget-styled'
import Doughnut from '../components/Charts/Doughnut'
import WidgetContainer, {
  WidgetTitle,
  WidgetContainerProps
} from '../components/Charts/Container'

export interface ActualityWidgetProps extends WidgetContainerProps {
  outdated: number
  total: number
}

const ActualityWidget = (props: ActualityWidgetProps) => {
  const { outdated, total, title, ref, ...rest } = props
  const outDatedPercent = Math.round((outdated / total) * 100 * 10) / 10
  const upToDatePercent =
    Math.round(((total - outdated) / total) * 100 * 10) / 10
  return (
    <WidgetContainer {...rest}>
      <WidgetTitle>{title}</WidgetTitle>
      <StatusWrapper>
        <StatusContainer>
          Outdated
          <Percent>{outDatedPercent}%</Percent>
        </StatusContainer>
        <Doughnut percent={outDatedPercent} />
        <StatusContainer>
          Up to Date
          <Percent>{upToDatePercent}%</Percent>
        </StatusContainer>
      </StatusWrapper>
    </WidgetContainer>
  )
}

export default React.memo(ActualityWidget)
