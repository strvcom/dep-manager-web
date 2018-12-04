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
import LibrariesActualityWidget from '../../containers/LibrariesActualityWidget'
import RecentUpdates from './RecentUpdates'
import { Department } from '../../data/__generated-types'
import { toUpper } from 'ramda'
import { useLibraries } from '../../data/Library'
import { useRepositories } from '../../data/Repository'
import ToolBar, { ToolBarLink } from '../../components/ToolBar'

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
    const department = toUpper(props.match.params.department) as Department
    const { data, loading } = useRepositories(department)
    if (loading) return null
    return <ProjectsTable baseUrl={props.match.url} projects={data!} />
  }
)

const AllLibrariesTable = React.memo(
  (props: RouteComponentProps<{ department: string }>) => {
    const department = toUpper(props.match.params.department) as Department
    const { data, loading } = useLibraries({ department })
    if (loading) return null
    return <LibrariesTable baseUrl={props.match.url} libraries={data} />
  }
)

const Widgets = React.memo(
  (props: RouteComponentProps<{ department: string }>) => {
    const department = toUpper(props.match.params.department) as Department
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
    return (
      <WidgetContainer>
        <ProjectsOverviewWidget projects={repositories!} width='32%' />
        <LibrariesActualityWidget width='32%' libraries={libraries} />
        <RecentUpdates libraries={recentLibraries} width='32%' />
      </WidgetContainer>
    )
  }
)
