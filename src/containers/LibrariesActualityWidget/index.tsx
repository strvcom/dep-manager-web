import React from 'react'
import {
  StatusWrapper,
  StatusContainer,
  Percent
} from '../../routes/Dashboard/widget-styled'
import Doughnut from '../../components/Charts/Doughnut'
import WidgetContainer, {
  WidgetTitle,
  WidgetContainerProps
} from '../../components/Charts/Container'

export interface ActualityWidgetProps extends WidgetContainerProps {
  title?: string
  outdated: number
  total: number
}

const ActualityWidget = (props: ActualityWidgetProps) => {
  const { outdated, total, title, ref, ...rest } = props

  const perc = {
    outdated: Math.round((outdated / total) * 100 * 10) / 10,
    uptodate: Math.round(((total - outdated) / total) * 100 * 10) / 10
  }

  return (
    <WidgetContainer {...rest}>
      {title && <WidgetTitle>{title}</WidgetTitle>}

      <StatusWrapper>
        <StatusContainer>
          Outdated
          <Percent>{perc.outdated}%</Percent>
        </StatusContainer>
        <Doughnut percent={perc.outdated} />
        <StatusContainer>
          Up to Date
          <Percent>{perc.uptodate}%</Percent>
        </StatusContainer>
      </StatusWrapper>
    </WidgetContainer>
  )
}

export default React.memo(ActualityWidget)
