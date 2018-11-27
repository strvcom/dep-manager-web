import React from 'react'
import { Route, Switch, RouteComponentProps } from 'react-router-dom'
import Loading from '../../components/Loading'
import { TableContainer, StyledDashboard, WidgetContainer } from './styled'
import { DashboardToolBar, LibraryToolBar, ProjectToolBar } from './ToolBar'
import * as routes from '../routes'
import { Category } from '../../config/types'
import { Repositories_nodes } from '../../data/Repository/__generated-types/Repositories'
import {
  ProjectsOverviewWidget,
  LibrariesActualityWidget,
  RecentUpdates
} from '../../components/Widgets'
import { Department } from '../../data/__generated-types'
import { toUpper } from 'ramda'
import { useLibraries } from '../../data/Library'
import { useRepositories } from '../../data/Repository'

const LibrariesTable = React.lazy(() =>
  import(/* webpackChunkName: 'LibrariesTable' */ './LibrariesTable')
)
const ProjectsTable = React.lazy(() =>
  import(/* webpackChunkName: 'ProjectsTable' */ './ProjectsTable')
)

export type DashboardProps = RouteComponentProps<{
  department: string
  category: Category
}>
function Dashboard ({ match: { params }, history }: DashboardProps) {
  const department = toUpper(params.department) as Department
  const repositories = useRepositories(department)
  const libraries = useLibraries(department)
  const handleRowClick = React.useCallback(
    (project: Repositories_nodes) =>
      history.push(`/${params.department}/${params.category}/${project.name}`),
    [params.department, params.category]
  )
  const renderProjectsTable = React.useCallback(
    () => (
      <ProjectsTable
        libraries={libraries.nodes}
        onRowClick={handleRowClick}
        projects={repositories!}
      />
    ),
    [repositories, libraries.nodes, handleRowClick]
  )
  const renderLibrariesTable = React.useCallback(
    () => (
      <LibrariesTable onRowClick={handleRowClick} libraries={libraries.nodes} />
    ),
    [libraries.nodes, handleRowClick]
  )
  const renderWidgets = React.useCallback(
    () => (
      <WidgetContainer>
        <ProjectsOverviewWidget projects={repositories!} width='32%' />
        <LibrariesActualityWidget width='32%' libraries={libraries.nodes} />
        <RecentUpdates libraries={libraries.nodes} width='32%' />
      </WidgetContainer>
    ),
    [libraries.nodes, repositories]
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
