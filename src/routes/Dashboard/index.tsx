import React from 'react'
import { Switch, Route, RouteComponentProps } from 'react-router-dom'
import Loading from '../../components/Loading'
import {
  TableContainer,
  StyledDashboard,
  WidgetContainer,
  Input
} from './styled'
import * as routes from '../routes'
import { Category } from '../../config/types'
import ProjectsOverviewWidget from './ProjectsOverviewWidget'
import ActualityWidget from '../../containers/LibrariesActualityWidget'
import RecentUpdates from './RecentUpdates'
import ToolBar, { ToolBarLink } from '../../components/ToolBar'
import toBidaDepartment from '../../utils/toDepartment'
import { BidaDepartment } from '../../data/__generated-types'
import NodeProjectsTable from '../../containers/FrontendProjectsTable'
import LocalProjectsTable from '../../containers/LocalProjectsTable'
import NodeLibrariesTable from '../../containers/NodeLibrariesTable'
import LibrariesTable from '../../containers/LibrariesTable'
import ErrorBoundary from 'react-error-boundary'
import gql from 'graphql-tag'
import { useQuery } from '../../hooks/apollo-hooks'
import {
  DashboardData,
  DashboardDataVariables,
  DashboardData_projects_nodes_BidaNodeProject
} from './__generated-types/DashboardData'
import { ApolloQueryResult } from 'apollo-client'
import useFirstDayOfMonth from '../../hooks/firstDayOfMonth'

export type DashboardProps = RouteComponentProps<{
  department: string
  category: Category
}>

function Dashboard ({ match }: DashboardProps) {
  const department = toBidaDepartment(match!.params.department)
  const { data, loading } = Dashboard.useDashboardData({
    department,
    from: useFirstDayOfMonth()
  })
  const { projects, libraries, recentLibraries } = data
  if (loading) return <Loading />
  const renderWidgets = React.useCallback(
    () => (
      <WidgetContainer>
        <ProjectsOverviewWidget
          total={projects.totalCount}
          archived={projects.totalArchived}
          width='32%'
        />
        <ActualityWidget
          title='Libraries Actuality'
          width='32%'
          outdated={libraries.outdatedDependentsCount}
          total={libraries.totalCount}
        />
        <RecentUpdates libraries={recentLibraries.nodes} width='32%' />
      </WidgetContainer>
    ),
    [
      projects.totalCount,
      projects.totalArchived,
      libraries.totalCount,
      recentLibraries.nodes
    ]
  )
  const renderLibraries = React.useCallback(
    () => {
      switch (department) {
        case BidaDepartment.FRONTEND:
          return <NodeLibrariesTable libraries={libraries.nodes} />
        default:
          return <LibrariesTable libraries={libraries.nodes} />
      }
    },
    [department, libraries.nodes]
  )
  const renderProjects = React.useCallback(
    () => {
      switch (department) {
        case BidaDepartment.FRONTEND:
          return (
            <NodeProjectsTable
              projects={
                projects.nodes as DashboardData_projects_nodes_BidaNodeProject[]
              }
            />
          )
        default:
          return <LocalProjectsTable projects={projects.nodes} />
      }
    },
    [department, projects.nodes]
  )
  return (
    <React.Fragment>
      <ToolBar
        title='Dashboard'
        links={
          <React.Fragment>
            <ToolBarLink to={`/${match!.params.department}/libraries`}>
              Libraries
            </ToolBarLink>
            <ToolBarLink to={`/${match!.params.department}/projects`}>
              Projects
            </ToolBarLink>
          </React.Fragment>
        }
        children={<Input placeholder={`Search ${match!.params.category}`} />}
      />
      <StyledDashboard>
        <React.Suspense fallback={<Loading />}>
          <TableContainer>
            <ErrorBoundary onError={() => console.log('widgets')}>
              <Route exact path={routes.dashboard} render={renderWidgets} />
            </ErrorBoundary>
            <ErrorBoundary onError={() => console.log('table')}>
              <Switch>
                <Route exact path={routes.projects} render={renderProjects} />
                <Route exact path={routes.libraries} render={renderLibraries} />
              </Switch>
            </ErrorBoundary>
          </TableContainer>
        </React.Suspense>
      </StyledDashboard>
    </React.Fragment>
  )
}

Dashboard.DATA_QUERY = gql`
  query DashboardData($department: BidaDepartment!, $from: Date!) {
    projects(department: $department) @client {
      id
      totalCount
      totalArchived
      nodes {
        id
        name
        url
        pushedAt
        ... on BidaNodeProject {
          outdatedLibraries
          alertedLibraries
        }
      }
    }
    libraries(department: $department) @client {
      id
      totalCount
      outdatedDependentsCount
      nodes {
        id
        name
        date
        ... on BidaNodeLibrary {
          totalDependentsCount
          outdatedDependentsCount
          alertedDependentsCount
          license
          version
        }
      }
    }
    recentLibraries: libraries(department: $department, from: $from) @client {
      id
      nodes {
        id
        name
        date
        ... on BidaNodeLibrary {
          version
        }
      }
    }
  }
`

Dashboard.useDashboardData = (
  variables: DashboardDataVariables
): ApolloQueryResult<DashboardData> => {
  return useQuery<DashboardData, DashboardDataVariables>(
    Dashboard.DATA_QUERY,
    {
      variables
    },
    [variables.department]
  )
}

export default React.memo(Dashboard)
