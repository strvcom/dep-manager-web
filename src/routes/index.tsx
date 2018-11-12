import React from 'react'
import Login from './Login'
import Loading from '../components/Loading'
import Nav from './Nav'
import {
  Redirect,
  Switch,
  Route,
  withRouter,
  RouteComponentProps
} from 'react-router-dom'
import * as routes from './routes'
import { VIEWER_QUERY } from '../data/Viewer'
import { Me } from '../data/types'
import { useQuery } from '../utils/hooks'
import { AUTH_QUERY, AuthQueryResponse } from '../data/Auth'

const Dashboard = React.lazy(() => import('./Dashboard'))

const App = () => {
  const { data } = useQuery<AuthQueryResponse>({
    query: AUTH_QUERY,
    cached: true
  })
  const { auth } = data || { auth: null }
  return (
    <Switch>
      {auth && auth.token && <Redirect to={routes.root} from={routes.login} />}
      <Route path={routes.login} render={props => <Login {...props} />} />
      {(!auth || !auth.token) && <Redirect to={routes.login} />}
      {auth && auth.token && (
        <Route
          path={routes.root}
          render={props => <AuthorizedRoutes {...props} />}
        />
      )}
    </Switch>
  )
}

const AuthorizedRoutes = React.memo((props: RouteComponentProps) => {
  const { data, loading } = useQuery<Me>({
    query: VIEWER_QUERY,
    fetchPolicy: 'network-only'
  })
  return (
    <React.Fragment>
      <Nav />
      <React.Suspense fallback={<Loading />}>
        {loading && <Loading />}
        {data && data.viewer && <Dashboard />}
      </React.Suspense>
    </React.Fragment>
  )
})

export default withRouter(React.memo(App))
