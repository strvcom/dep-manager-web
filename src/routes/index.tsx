import React from 'react'
import Login from './Login'
import NavBar, { NavBarLink } from '../containers/NavBar'
import { Redirect, Switch, Route, RouteComponentProps } from 'react-router-dom'
import * as routes from './routes'
import Loading from '../components/Loading'
import PrivateRoute from '../containers/PrivateRoute'
import PublicRoute from '../containers/PublicRoute'
import { ReactComponent as Logo } from '../assets/logo.svg'
import { ThemeProvider } from '../styles/styled'
import lightTheme from '../styles/themes/light'
import ErrorBoundary from 'react-error-boundary'
import usePromise from '../utils/promise-hook'
import { runInitializers } from '../utils/apollo-utils'
import projectsInitializers from '../config/initializers/projectsInitializers'
import toBidaDepartment from '../utils/toDepartment'
import { Category } from '../config/types'

export interface InitializeDataProps
  extends RouteComponentProps<{ department: string; category: Category }> {
  children: React.ReactElement<any> | null
}

const InitializeData = React.memo((props: InitializeDataProps) => {
  const department = toBidaDepartment(props.match!.params.department)
  const { pending } = usePromise(
    () => runInitializers(projectsInitializers(department)),
    [department]
  )
  if (pending) return <Loading />
  return props.children
})

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: 'Dashboard' */ './Dashboard')
)

const ProjectDetails = React.lazy(() =>
  import(/* webpackChunkName: 'ProjectDetails' */ './ProjectDetails')
)

// const LibrariesDetails = React.lazy(() =>
//   import(/* webpackChunkName: 'LibrariesDetails' */ './LibrariesDetails')
// )

const PrivatePage = React.memo(() => (
  <ThemeProvider theme={lightTheme}>
    <React.Fragment>
      <NavBar logo={<Logo height='16' />}>
        <NavBarLink to={routes.frontendLibraries}>Frontend</NavBarLink>
        <NavBarLink to={routes.backendLibraries}>Backend</NavBarLink>
        <NavBarLink to={routes.iosLibraries}>iOS</NavBarLink>
        <NavBarLink to={routes.androidLibraries}>Android</NavBarLink>
      </NavBar>
      <React.Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <Route
            path={routes.department}
            render={props => (
              <InitializeData {...props}>
                <Switch>
                  <Route
                    path={routes.projectDetails}
                    component={ProjectDetails}
                  />
                  {/* <Route path={routes.librariesDetails} component={LibrariesDetails} /> */}
                  <Route path={routes.dashboard} component={Dashboard} />
                </Switch>
              </InitializeData>
            )}
          />
        </ErrorBoundary>
      </React.Suspense>
    </React.Fragment>
  </ThemeProvider>
))

const App = () => (
  <Switch>
    <PublicRoute redirect={routes.root} path={routes.login} component={Login} />
    <Redirect exact from={routes.root} to={routes.frontendLibraries} />
    <PrivateRoute
      redirect={routes.login}
      path={routes.root}
      component={PrivatePage}
    />
  </Switch>
)

export default App
