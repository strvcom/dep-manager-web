import React, { memo } from 'react'

import ActualityWidget from '../../containers/LibrariesActualityWidget'

import { WidgetContainer } from './styled'
import ProjectsOverviewWidget from './ProjectsOverviewWidget'
import RecentUpdates from './RecentUpdates'

interface Props {
  projects: {
    total: number
  }
  archived: {
    total: number
  }
}

const Widgets = ({ projects, archived }: Props) => (
  <WidgetContainer>
    <ProjectsOverviewWidget
      total={projects.total}
      archived={archived.total}
      width='32%'
    />
  </WidgetContainer>
)

export default memo(Widgets)
