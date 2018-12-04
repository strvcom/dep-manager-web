import React from 'react'
import Login from './Login'
import NavBar, { NavBarLink } from '../containers/NavBar'
import { Redirect, Switch, Route, RouteComponentProps } from 'react-router-dom'
import * as routes from './routes'
import Loading from '../components/Loading'
import PrivateRoute from '../containers/PrivateRoute'
import PublicRoute from '../containers/PublicRoute'
import { ReactComponent as Logo } from '../assets/logo.svg'
import toUpper from 'ramda/es/toUpper'
import { Department } from '../data/__generated-types'
import { useRepositories } from '../data/Repository'
import { useLibraries } from '../data/Library'

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: 'Dashboard' */ './Dashboard')
)

const ProjectDetails = React.lazy(() =>
  import(/* webpackChunkName: 'ProjectDetails' */ './ProjectDetails')
)

const LibrariesDetails = React.lazy(() =>
  import(/* webpackChunkName: 'LibrariesDetails' */ './LibrariesDetails')
)

const PrivatePage = () => (
  <React.Fragment>
    <NavBar logo={<Logo height='16' />}>
      <NavBarLink to={routes.frontendLibraries}>Frontend</NavBarLink>
      <NavBarLink to={routes.backendLibraries}>Backend</NavBarLink>
      <NavBarLink to={routes.iosLibraries}>iOS</NavBarLink>
      <NavBarLink to={routes.androidLibraries}>Android</NavBarLink>
    </NavBar>
    <React.Suspense fallback={<Loading />}>
      <Route path={routes.department} component={Departments} />
    </React.Suspense>
  </React.Fragment>
)

const Departments = React.memo(
  (props: RouteComponentProps<{ department: string }>) => {
    const department = toUpper(props.match.params.department) as Department
    const { loading: L1 } = useRepositories(department)
    const { loading: L2 } = useLibraries({ department })
    if (L1 || L2) return <Loading />
    return (
      <Switch>
        <Route path={routes.projectsDetails} component={ProjectDetails} />
        <Route path={routes.librariesDetails} component={LibrariesDetails} />
        <Route path={routes.dashboard} component={Dashboard} />
      </Switch>
    )
  }
)

const App = () => (
  <Switch>
    <PublicRoute redirect={routes.root} path={routes.login} component={Login} />
    <Redirect exact from={routes.root} to={routes.frontendLibraries} />
    <PrivateRoute
      redirect={routes.login}
      path={routes.root}
      render={PrivatePage}
    />
  </Switch>
)

export default App
