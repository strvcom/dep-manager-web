import React, { Suspense, memo, useState, FunctionComponent } from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import ErrorBoundary from 'react-error-boundary'
import { pipe, prop, map, filter, includes } from 'ramda'

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

import {
  BidaDepartment,
  SemverOutdateStatus as distances,
} from '../../generated/graphql-types'

import DASHBOARD_QUERY from './query.gql'

import {
  DASHBOARD_QUERY as IData,
  DASHBOARD_QUERYVariables as IVariables,
  DASHBOARD_QUERY_projects_edges_node_Repository as IRepository,
  DASHBOARD_QUERY_projects_edges_node_Repository_npmPackage_dependencies as ILibrary,
} from './graphql-types/DASHBOARD_QUERY'

type IProps = RouteComponentProps<{
  department: string
  category: string
}>

const filterProjects = (search: string): Function =>
  pipe(
    map(prop('node')),
    filter(
      pipe(
        prop('name'),
        includes(search)
      )
    )
  )

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
        <AuthenticatedQuery<IData, IVariables>
          query={DASHBOARD_QUERY}
          variables={{ department: department.toUpperCase() as BidaDepartment }}
          children={({ data, loading, error }): React.ReactNode => {
            if (error) throw error
            if (loading) return <Loading />
            if (!data) return null

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
              const filtered = filterProjects(search)(
                projects.edges
              ) as IRepository[]

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
        />
      </StyledDashboard>
    </>
  )
}

export default memo(Dashboard)
