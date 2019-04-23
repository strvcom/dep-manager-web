import React, { Fragment, Suspense, memo, useState } from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import ErrorBoundary from 'react-error-boundary'

import * as routes from '../routes'
import AuthenticatedQuery from '../../containers/AuthenticatedQuery'
import Loading from '../../components/Loading'
import NodeLibrariesTable from '../../components/NodeLibrariesTable'
import NodeProjectsTable from '../../components/NodeProjectsTable'
import ActualityWidget from '../../containers/ActualityWidget'

import ProjectsOverviewWidget from './ProjectsOverviewWidget'
import RecentUpdates from './RecentUpdates'
import DashboardToolBar from './DashboardToolBar'
import { TableContainer, StyledDashboard, WidgetContainer } from './styled'
import { extractLibrariesInfo } from './helpers'
import { DASHBOARD_QUERY } from './query.gql'

export interface Props
  extends RouteComponentProps<{
    department: string
    category: string
  }> {}

const distances = {
  MAJOR: 'MAJOR'
}

const Dashboard = ({ match }: Props) => {
  const { department, category } = match!.params

  const [search, setSearch] = useState('')

  return (
    <Fragment>
      <DashboardToolBar
        department={department}
        category={category}
        search={search}
        setSearch={setSearch}
      />

      <StyledDashboard>
        <AuthenticatedQuery
          query={DASHBOARD_QUERY}
          variables={{ department: department.toUpperCase() }}
        >
          {({ data, loading, error }: any) => {
            if (error) throw error
            if (loading) return <Loading />

            const { projects, archived } = data

            // heavy processing here:
            const {
              libraries,
              uniqueLibraries,
              outdates,
              recentlyUpdated
            } = extractLibrariesInfo(projects)

            const { [distances.MAJOR]: major } = outdates

            const renderWidgets = () => (
              <WidgetContainer>
                <ProjectsOverviewWidget
                  total={projects.total}
                  archived={archived.total}
                  width='32%'
                />

                <ActualityWidget
                  title='Libraries Actuality'
                  width='32%'
                  outdated={major.length}
                  total={libraries.length}
                />

                <RecentUpdates libraries={recentlyUpdated} width='32%' />
              </WidgetContainer>
            )

            const renderLibraries = () => {
              const filtered = uniqueLibraries.filter(
                ({ package: { name } }: any) => name.includes(search)
              )

              return (
                <NodeLibrariesTable
                  libraries={filtered}
                  outdates={outdates}
                  cacheKey={search}
                />
              )
            }

            const renderProjects = () => {
              const filtered = projects.edges
                .map(({ node }: any) => node)
                .filter(({ name }: any) => name.includes(search))

              return (
                <NodeProjectsTable
                  department={department}
                  projects={filtered}
                  cacheKey={search}
                />
              )
            }

            return (
              <Suspense fallback={<Loading />}>
                <ErrorBoundary>
                  <TableContainer>
                    <Route
                      exact
                      path={routes.dashboard}
                      render={renderWidgets}
                    />

                    <Switch>
                      <Route
                        exact
                        path={routes.libraries}
                        render={renderLibraries}
                      />

                      <Route
                        exact
                        path={routes.projects}
                        render={renderProjects}
                      />
                    </Switch>
                  </TableContainer>
                </ErrorBoundary>
              </Suspense>
            )
          }}
        </AuthenticatedQuery>
      </StyledDashboard>
    </Fragment>
  )
}

export default memo(Dashboard)
