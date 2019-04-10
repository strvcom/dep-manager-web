import React, { Fragment, Suspense, memo } from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import gql from 'graphql-tag'
import ErrorBoundary from 'react-error-boundary'

import * as routes from '../routes'
import AuthenticatedQuery from '../../containers/AuthenticatedQuery'
import Loading from '../../components/Loading'
import ActualityWidget from '../../containers/LibrariesActualityWidget'
import NodeLibrariesTable from '../../containers/NodeLibrariesTable'
import NodeProjectsTable from '../../containers/FrontendProjectsTable'

import ProjectsOverviewWidget from './ProjectsOverviewWidget'
import RecentUpdates from './RecentUpdates'
import DashboardToolBar from './DashboardToolBar'
import { TableContainer, StyledDashboard, WidgetContainer } from './styled'
import { extractLibrariesInfo } from './helpers'

const DASHBOARD_QUERY = gql`
  query DASHBOARD_QUERY($department: BidaDepartment!) {
    projects(first: 50, department: $department) {
      total: repositoryCount
      edges {
        cursor
        node {
          ... on Repository {
            id
            name
            pushedAt
            npmPackage {
              id
              dependencies {
                id
                name
                outdateStatus
                package {
                  id
                  name
                  version
                  license
                  updatedAt
                }
              }
            }
          }
        }
      }
    }

    archived: projects(department: $department, archived: true) {
      total: repositoryCount
    }
  }
`

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

  return (
    <Fragment>
      <DashboardToolBar department={department} category={category} />

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

            const renderLibraries = () => (
              <NodeLibrariesTable
                libraries={uniqueLibraries}
                outdates={outdates}
              />
            )

            const renderProjects = () => (
              <NodeProjectsTable
                projects={projects.edges.map(({ node }: any) => node)}
              />
            )

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
