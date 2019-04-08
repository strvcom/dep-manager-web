import React, { Fragment, Suspense, memo } from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'
import gql from 'graphql-tag'
import ErrorBoundary from 'react-error-boundary'

import * as routes from '../routes'
import AuthenticatedQuery from '../../containers/AuthenticatedQuery'
import Loading from '../../components/Loading'

import { TableContainer, StyledDashboard } from './styled'
import DashboardToolBar from './DashboardToolBar'
import Widgets from './Widgets'

const DASHBOARD_QUERY = gql`
  query DASHBOARD_QUERY($department: BidaDepartment!) {
    projects(first: 10, department: $department) {
      total: repositoryCount
      edges {
        cursor
        node {
          ... on Repository {
            name
            npmPackage {
              dependencies {
                id
                package {
                  id
                  name
                  version
                  analysis {
                    analyzedAt
                    collected {
                      metadata {
                        name
                        version
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
    <AuthenticatedQuery
      query={DASHBOARD_QUERY}
      variables={{ department: department.toUpperCase() }}
    >
      {({ data, loading, error }: any) => {
        if (error) throw error

        return (
          <Fragment>
            <DashboardToolBar department={department} category={category} />

            <StyledDashboard>
              {loading ? (
                <Loading />
              ) : (
                <Suspense fallback={<Loading />}>
                  <ErrorBoundary>
                    <TableContainer>
                      <Route
                        exact
                        path={routes.dashboard}
                        render={() => <Widgets {...data} />}
                      />
                    </TableContainer>
                  </ErrorBoundary>
                </Suspense>
              )}
            </StyledDashboard>
          </Fragment>
        )
      }}
    </AuthenticatedQuery>
  )
}

export default memo(Dashboard)
