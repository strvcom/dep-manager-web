import React from 'react'
import { Route, Switch, RouteComponentProps } from 'react-router-dom'
import Loading from '../../components/Loading'
import { TableContainer, StyledDashboard } from './styled'
import { DashboardToolBar, LibraryToolBar, ProjectToolBar } from './ToolBar'
import * as routes from '../routes'
import { LibrariesTable } from './LibrariesTable'
import { ProjectsTable } from './ProjectsTable'
import { Category, Department } from '../../config/types'
import { Repositories_nodes } from '../../data/Repository/__generated-types/Repositories'

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
  return (
    <React.Fragment>
      <Switch>
        <Route path={routes.project} component={ProjectToolBar} />
        <Route path={routes.library} component={LibraryToolBar} />
        <Route path={routes.dashboard} component={DashboardToolBar} />
      </Switch>
      <StyledDashboard>
        <TableContainer>
          <React.Suspense fallback={<Loading />}>
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
          </React.Suspense>
        </TableContainer>
      </StyledDashboard>
    </React.Fragment>
  )
}

export default React.memo(Dashboard)
