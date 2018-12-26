import React from 'react'
import { Status, Count } from './widget-styled'
import Bar from '../../components/Charts/Bar'
import WidgetContainer, {
  WidgetContainerProps,
  WidgetTitle
} from '../../components/Charts/Container'

export interface ProjectsOverviewWidgetProps
  extends Pick<WidgetContainerProps, 'width'> {
  total: number
  archived: number
}

const ProjectsOverviewWidget = ({
  width,
  total,
  archived
}: ProjectsOverviewWidgetProps) => {
  const active = total - archived
  return (
    <WidgetContainer width={width}>
      <WidgetTitle>Projects Overview</WidgetTitle>
      <Bar fill={(active / total) * 100} />
      <Status>
        <div>
          Active <Count>{active}</Count>
          &nbsp;&nbsp;&nbsp;&nbsp; Archived&nbsp;
          <Count>{archived}</Count>
        </div>
        <div>
          Total <Count>{total}</Count>
        </div>
      </Status>
    </WidgetContainer>
  )
}

export default React.memo(ProjectsOverviewWidget)
