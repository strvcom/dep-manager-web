import React, { memo } from 'react'
import { converge, equals, map, path, pathOr, pipe, prop, uniqBy } from 'ramda'

import ActualityWidget from '../../containers/LibrariesActualityWidget'
import versionDiff from '../../utils/version-diff'

import { WidgetContainer } from './styled'
import ProjectsOverviewWidget from './ProjectsOverviewWidget'
// import RecentUpdates from './RecentUpdates'

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

const getDependencies = pipe(
  pathOr([], ['npmPackage', 'dependencies']),
  map(prop('package'))
)

const getAllDependencies = pipe(
  // @ts-ignore
  map(getDependencies),
  // @ts-ignore
  libraries => [].concat(...libraries),
  // @ts-ignore
  uniqBy(prop('id'))
)

const isOutdated = pipe(
  converge(versionDiff, [
    prop('version'),
    path(['analysis', 'collected', 'metadata', 'version'])
  ]),
  equals('major')
)

const Widgets = ({ projects, archived }: Props) => {
  const libraries: any = getAllDependencies(projects.edges.map(prop('node')))
  const outdatedLibraries = libraries.filter(isOutdated)

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
    </WidgetContainer>
  )
}

export default memo(Widgets)
