import React, { FunctionComponent } from 'react'

import {
  StatusWrapper,
  StatusContainer,
  Percent,
} from '../../routes/Dashboard/widget-styled'
import Doughnut from '../Charts/Doughnut'
import WidgetContainer, {
  WidgetTitle,
  WidgetContainerProps,
} from '../Charts/Container'

interface IActualityWidgetProps extends WidgetContainerProps {
  title?: string
  outdated: number
  total: number
}

const ActualityWidget: FunctionComponent<IActualityWidgetProps> = (
  props: IActualityWidgetProps
): JSX.Element => {
  const { outdated, total, title, ref: ignored, ...rest } = props

  const perc = {
    outdated: Math.round((outdated / total) * 100 * 10) / 10,
    uptodate: Math.round(((total - outdated) / total) * 100 * 10) / 10,
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
