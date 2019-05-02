import React, { Suspense, memo, useState, FunctionComponent } from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import ErrorBoundary from 'react-error-boundary'

import * as routes from '../routes'
import AuthenticatedQuery from '../../containers/AuthenticatedQuery'
import Loading from '../../components/Loading'
import NodeLibrariesTable from '../../components/NodeLibrariesTable'
import NodeProjectsTable from '../../components/NodeProjectsTable'
import ActualityWidget from '../../components/ActualityWidget'

import ProjectsOverviewWidget from './ProjectsOverviewWidget'
import RecentUpdates from './RecentUpdates'
import DashboardToolBar from './DashboardToolBar'
import { TableContainer, StyledDashboard, WidgetContainer } from './styled'
import { extractLibrariesInfo } from './helpers'
import DASHBOARD_QUERY from './query.gql'

type IProps = RouteComponentProps<{
  department: string
  category: string
}>

interface IProject {
  name: string
}

interface ILibrary {
  package: {
    name: string
  }
}

interface IProjectEdge {
  node: IProject
}

const distances = {
  MAJOR: 'MAJOR',
}

const Dashboard: FunctionComponent<IProps> = ({
  match,
}: IProps): JSX.Element => {
  const { department, category } = match.params
  const [search, setSearch] = useState('')

  const cacheKey = department + search

  return (
    <>
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
          {({ data, loading, error }: any): JSX.Element => {
            if (error) throw error
            if (loading) return <Loading />

            const { projects, archived } = data

            // heavy processing here:
            const {
              libraries,
              uniqueLibraries,
              outdates,
              recentlyUpdated,
            } = extractLibrariesInfo(projects)

            const { [distances.MAJOR]: major } = outdates

            const renderWidgets = (): JSX.Element => (
              <WidgetContainer>
                <ProjectsOverviewWidget
                  total={projects.total}
                  archived={archived.total}
                  width="32%"
                />

                <ActualityWidget
                  title="Libraries Actuality"
                  width="32%"
                  outdated={major.length}
                  total={libraries.length}
                />

                <RecentUpdates libraries={recentlyUpdated} width="32%" />
              </WidgetContainer>
            )

            const renderLibraries = (): JSX.Element => {
              const filtered = uniqueLibraries.filter(
                ({ package: { name } }: ILibrary) => name.includes(search)
              )

              return (
                <NodeLibrariesTable
                  libraries={filtered}
                  outdates={outdates}
                  cacheKey={cacheKey}
                />
              )
            }

            const renderProjects = (): JSX.Element => {
              const filtered = projects.edges
                .map(({ node }: IProjectEdge) => node)
                .filter(({ name }: IProject): boolean => name.includes(search))

              return (
                <NodeProjectsTable
                  department={department}
                  projects={filtered}
                  cacheKey={cacheKey}
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
    </>
  )
}

export default memo(Dashboard)
