import React, { memo } from 'react'
import { prop } from 'ramda'

import ActualityWidget from '../../containers/LibrariesActualityWidget'

import { WidgetContainer } from './styled'
import ProjectsOverviewWidget from './ProjectsOverviewWidget'
import RecentUpdates from './RecentUpdates'
import { getAllDependencies, isOutdated, getRecentlyUpdated } from './helpers'

interface Props {
  projects: {
    total: number
    edges: Array<{
      node: any
    }>
  }
  archived: {
    total: number
  }
}

const Widgets = ({ projects, archived }: Props) => {
  const libraries: any = getAllDependencies(projects.edges.map(prop('node')))
  const outdatedLibraries = libraries.filter(isOutdated)
  const recentlyUpdatedLibraries: any[] = getRecentlyUpdated(libraries)

  return (
    <WidgetContainer>
      <ProjectsOverviewWidget
        total={projects.total}
        archived={archived.total}
        width='32%'
      />
      <ActualityWidget
        title='Libraries Actuality'
        width='32%'
        outdated={outdatedLibraries.length}
        total={libraries.length}
      />
      <RecentUpdates libraries={recentlyUpdatedLibraries} width='32%' />
    </WidgetContainer>
  )
}

export default memo(Widgets)
