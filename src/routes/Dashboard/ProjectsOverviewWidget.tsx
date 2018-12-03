import React from 'react'
import { Status, Count } from './widget-styled'
import { Repository } from '../../data/Repository/__generated-types/Repository'
import Bar from '../../components/Charts/Bar'
import WidgetContainer, {
  WidgetContainerProps,
  WidgetTitle
} from '../../components/Charts/Container'

export interface ProjectsOverviewWidgetProps
  extends Pick<WidgetContainerProps, 'width'> {
  projects: Repository[]
}

const ProjectsOverviewWidget = ({
  width,
  projects
}: ProjectsOverviewWidgetProps) => {
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
