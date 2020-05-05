import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import ErrorBoundary from 'react-error-boundary'

import Loading from '~app/components/Loading'
import NodeLibrariesTable from '~app/components/NodeLibrariesTable'
import NodeProjectsTable from '~app/components/NodeProjectsTable'
import ActualityWidget from '~app/components/ActualityWidget'
import RecentUpdates from '~app/components/RecentUpdates'
import { useQuery, GT } from '~api/client'
import { SemverOutdateStatus as distances } from '~app/@generated/types'

import * as routes from '../routes'
import ProjectsOverviewWidget from './ProjectsOverviewWidget'
import { TableContainer, WidgetContainer } from './styled'
import { extractLibrariesInfo, filterProjectsBySearch } from './helpers'
import document from './query.gql'

const DashboardContent: React.FC<{ department: GT.BidaDepartment; search: string }> = ({
  department,
  search,
}) => {
  const cacheKey = department + search

  const { data, loading, error } = useQuery('DASHBOARD_QUERY', document, {
    variables: { department },
  })

  if (error) throw error
  if (loading) return <Loading />
  if (!data) return null

  const { projects, archived } = data

  const { libraries, uniqueLibraries, outdates, recentlyUpdated } = extractLibrariesInfo(
    projects.edges as any
  )
  const { [distances.MAJOR]: major } = outdates

  const renderWidgets = () => (
    <WidgetContainer>
      <ProjectsOverviewWidget total={projects.total} archived={archived.total} width="32%" />

      <ActualityWidget
        title="Libraries Actuality"
        width="32%"
        outdated={major.length}
        total={libraries.length}
      />

      <RecentUpdates department={department} libraries={recentlyUpdated} width="32%" />
    </WidgetContainer>
  )

  const renderLibraries = () => {
    const filtered = uniqueLibraries.filter(({ package: { name } }) => name.includes(search))
    return <NodeLibrariesTable libraries={filtered} outdates={outdates} cacheKey={cacheKey} />
  }

  const renderProjects = () => {
    const filtered = filterProjectsBySearch(search)(projects.edges as any)
    return <NodeProjectsTable department={department} projects={filtered} cacheKey={cacheKey} />
  }

  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <TableContainer>
          <Route exact path={routes.dashboard} render={renderWidgets} />

          <Switch>
            <Route exact path={routes.libraries} render={renderLibraries} />
            <Route exact path={routes.projects} render={renderProjects} />
          </Switch>
        </TableContainer>
      </ErrorBoundary>
    </Suspense>
  )
}

export { DashboardContent }
