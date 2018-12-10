import React from 'react'
import { Route, Switch, RouteComponentProps } from 'react-router-dom'
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
import { useLibraries } from '../../data/Library'
import { useRepositories } from '../../data/Repository'
import ToolBar, { ToolBarLink } from '../../components/ToolBar'
import toDepartment from '../../utils/toDepartment'

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

function Dashboard ({ match: { params } }: DashboardProps) {
  return (
    <React.Fragment>
      <ToolBar
        title='Dashboard'
        links={
          <React.Fragment>
            <ToolBarLink to={`/${params.department}/libraries`}>
              Libraries
            </ToolBarLink>
            <ToolBarLink to={`/${params.department}/projects`}>
              Projects
            </ToolBarLink>
          </React.Fragment>
        }
        children={<Input placeholder={`Search ${params.category}`} />}
      />
      <StyledDashboard>
        <React.Suspense fallback={<Loading />}>
          <TableContainer>
            <Route exact path={routes.dashboard} component={Widgets} />
            <Switch>
              <Route
                exact
                path={routes.projects}
                component={AllProjectsTable}
              />
              <Route
                exact
                path={routes.libraries}
                component={AllLibrariesTable}
              />
            </Switch>
          </TableContainer>
        </React.Suspense>
      </StyledDashboard>
    </React.Fragment>
  )
}

export default React.memo(Dashboard)

const AllProjectsTable = React.memo(
  (props: RouteComponentProps<{ department: string }>) => {
    const department = toDepartment(props.match.params.department)
    const { data, loading } = useRepositories(department)
    if (loading) return null
    return <ProjectsTable baseUrl={props.match.url} projects={data!} />
  }
)

const AllLibrariesTable = React.memo(
  (props: RouteComponentProps<{ department: string }>) => {
    const department = toDepartment(props.match.params.department)
    const { data, loading } = useLibraries({ department })
    if (loading) return null
    return <LibrariesTable baseUrl={props.match.url} libraries={data} />
  }
)

const Widgets = React.memo(
  (props: RouteComponentProps<{ department: string }>) => {
    const department = toDepartment(props.match.params.department)
    const now = new Date()
    const firstDayOfMonth = React.useMemo(
      () => new Date(now.getFullYear(), now.getMonth(), 1),
      [now.getFullYear(), now.getMonth()]
    )
    const { data: repositories, loading: L1 } = useRepositories(department)
    const { data: libraries, loading: L2 } = useLibraries({ department })
    const { data: recentLibraries, loading: L3 } = useLibraries({
      department,
      range: { from: firstDayOfMonth }
    })
    if (L1 || L2 || L3) return null
    const { outdated, total } = React.useMemo(
      () =>
        libraries.reduce(
          (acc, { totalDependents, outdatedDependents }) => ({
            outdated: acc.outdated + outdatedDependents,
            total: acc.total + totalDependents
          }),
          { outdated: 0, total: 0 }
        ),
      [libraries]
    )
    return (
      <WidgetContainer>
        <ProjectsOverviewWidget projects={repositories!} width='32%' />
        <ActualityWidget
          title='Libraries Actuality'
          width='32%'
          outdated={outdated}
          total={total}
        />
        <RecentUpdates libraries={recentLibraries} width='32%' />
      </WidgetContainer>
    )
  }
)
