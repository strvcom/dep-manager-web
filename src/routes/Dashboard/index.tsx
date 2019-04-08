import React, { Fragment, Suspense, memo } from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'
import gql from 'graphql-tag'
import ErrorBoundary from 'react-error-boundary'

import * as routes from '../routes'
import AuthenticatedQuery from '../../containers/AuthenticatedQuery'
import Loading from '../../components/Loading'
import ActualityWidget from '../../containers/LibrariesActualityWidget'

import ProjectsOverviewWidget from './ProjectsOverviewWidget'
import RecentUpdates from './RecentUpdates'
import DashboardToolBar from './DashboardToolBar'
import { TableContainer, StyledDashboard, WidgetContainer } from './styled'
import { extractLibrariesInfo } from './helpers'

const DASHBOARD_QUERY = gql`
  query DASHBOARD_QUERY($department: BidaDepartment!) {
    projects(first: 10, department: $department) {
      total: repositoryCount
      edges {
        cursor
        node {
          ... on Repository {
            id
            name
            npmPackage {
              dependencies {
                id
                package {
                  id
                  name
                  version
                  outdated
                  analysis {
                    collected {
                      metadata {
                        date
                      }
                    }
                  }
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

type DashboardProps = RouteComponentProps<{
  department: string
  category: string
}>

const Dashboard = ({ match }: DashboardProps) => {
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
              outdated,
              recentlyUpdated
            } = extractLibrariesInfo(projects)

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
                  outdated={outdated.length}
                  total={libraries.length}
                />
                <RecentUpdates libraries={recentlyUpdated} width='32%' />
              </WidgetContainer>
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
