import React from 'react'
import { Route, Switch, RouteComponentProps } from 'react-router-dom'
import Loading from '../../components/Loading'
import { TableContainer, StyledDashboard, WidgetContainer } from './styled'
import { DashboardToolBar, LibraryToolBar, ProjectToolBar } from './ToolBar'
import * as routes from '../routes'
import { LibrariesTable } from './LibrariesTable'
import { ProjectsTable } from './ProjectsTable'
import { Category, Department } from '../../config/types'
import { Repositories_nodes } from '../../data/Repository/__generated-types/Repositories'
import {
  ProjectsOverviewWidget,
  LibraryActualityWidget,
  RecentUpdates
} from '../../components/Widgets'

export type DashboardProps = RouteComponentProps<{
  department: Department
  category: Category
}>

function Dashboard ({ match: { params }, history }: DashboardProps) {
  const { category, department } = params
  const handleRowClick = React.useCallback(
    (project: Repositories_nodes) =>
      history.push(`/${department}/${category}/${project.name}`),
    [department, category]
  )
  const renderProjectsTable = React.useCallback(
    () => <ProjectsTable onRowClick={handleRowClick} department={department} />,
    [department, handleRowClick]
  )
  const renderLibrariesTable = React.useCallback(
    () => (
      <LibrariesTable onRowClick={handleRowClick} department={department} />
    ),
    [department, handleRowClick]
  )
  const renderWidgets = React.useCallback(
    () => (
      <WidgetContainer>
        <ProjectsOverviewWidget department={department} width='32%' />
        <LibraryActualityWidget width='32%' department={department} />
        <RecentUpdates department={department} width='32%' />
      </WidgetContainer>
    ),
    [department]
  )
  return (
    <React.Fragment>
      <Switch>
        <Route path={routes.project} component={ProjectToolBar} />
        <Route path={routes.library} component={LibraryToolBar} />
        <Route path={routes.dashboard} component={DashboardToolBar} />
      </Switch>
      <StyledDashboard>
        <React.Suspense fallback={<Loading />}>
          <TableContainer>
            <Route exact path={routes.dashboard} render={renderWidgets} />
            <Switch>
              <Route
                exact
                path={routes.projects}
                render={renderProjectsTable}
              />
              <Route
                exact
                path={routes.libraries}
                render={renderLibrariesTable}
              />
            </Switch>
          </TableContainer>
        </React.Suspense>
      </StyledDashboard>
    </React.Fragment>
  )
}

export default React.memo(Dashboard)
