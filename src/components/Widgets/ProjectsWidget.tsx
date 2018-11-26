import React from 'react'
import {
  WidgetContainer,
  WidgetTitle,
  Status,
  BarChart,
  Count,
  WidgetContainerProps
} from './styled'
import { Repository } from '../../data/Repository/__generated-types/Repository'

export interface OverviewProps extends Pick<WidgetContainerProps, 'width'> {
  projects: Repository[]
}

const ProjectsOverviewWidget = ({ width, projects }: OverviewProps) => {
  const archived = React.useMemo(
    () =>
      projects.reduce((acc, project) => (project.isArchived ? acc++ : acc), 0),
    [projects]
  )
  const total = projects.length
  const active = total - archived
  return (
    <WidgetContainer width={width}>
      <WidgetTitle>Projects Overview</WidgetTitle>
      <BarChart fill={(active / total) * 100} />
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
