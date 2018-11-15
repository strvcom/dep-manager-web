import React from 'react'
import Login from './Login'
import NavBar, { NavBarLink } from '../containers/NavBar'
import { Redirect, Switch, Route } from 'react-router-dom'
import * as routes from './routes'
import Loading from '../components/Loading'
import PrivateRoute from '../containers/PrivateRoute'
import PublicRoute from '../containers/PublicRoute'
import { ReactComponent as Logo } from '../assets/logo.svg'

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: 'Dashboard' */ './Dashboard')
)

const MainPage = () => (
  <React.Fragment>
    <NavBar logo={<Logo height='16' />}>
      <NavBarLink to={routes.frontendProjects}>Frontend</NavBarLink>
      <NavBarLink to={routes.backendProjects}>Backend</NavBarLink>
      <NavBarLink to={routes.iosProjects}>iOS</NavBarLink>
      <NavBarLink to={routes.androidProjects}>Android</NavBarLink>
    </NavBar>
    <React.Suspense fallback={<Loading />}>
      <Route
        exact
        path={routes.dashboard}
        render={props => <Dashboard {...props} />}
      />
    </React.Suspense>
  </React.Fragment>
)

const App = () => (
  <Switch>
    <PublicRoute
      redirect={routes.root}
      path={routes.login}
      render={props => <Login {...props} />}
    />
    <Redirect exact from={routes.root} to={routes.frontendProjects} />
    <PrivateRoute
      redirect={routes.login}
      path={routes.root}
      render={MainPage}
    />
  </Switch>
)

export default App
