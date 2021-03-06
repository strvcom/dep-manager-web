import React, { FunctionComponent } from 'react'
import Login from './Login'
import NavBar, { NavBarLink } from '../containers/NavBar'
import { Redirect, Switch, Route } from 'react-router-dom'
import * as routes from './routes'
import Loading from '../components/Loading'
import PrivateRoute from '../containers/PrivateRoute'
import PublicRoute from '../containers/PublicRoute'
import { ReactComponent as Logo } from '../assets/logo.svg'
import { ThemeProvider } from 'styled-components'
import lightTheme from '../styles/themes/light'
import ErrorBoundary from 'react-error-boundary'
import Department from './Department'

const PrivatePage = React.memo(() => (
  <ThemeProvider theme={lightTheme}>
    <>
      <NavBar logo={<Logo height="16" />}>
        <NavBarLink to={routes.frontendLibraries}>Frontend</NavBarLink>
        <NavBarLink to={routes.backendLibraries}>Backend</NavBarLink>
        <NavBarLink to={routes.iosLibraries}>iOS</NavBarLink>
        <NavBarLink to={routes.androidLibraries}>Android</NavBarLink>
      </NavBar>
      <React.Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <Route path={routes.department} component={Department} />
        </ErrorBoundary>
      </React.Suspense>
    </>
  </ThemeProvider>
))

const App: FunctionComponent = () => (
  <Switch>
    <PublicRoute redirect={routes.root} path={routes.login} component={Login} />
    <Redirect exact from={routes.root} to={routes.frontendLibraries} />
    <PrivateRoute redirect={routes.login} path={routes.root} component={PrivatePage} />
  </Switch>
)

export default App
