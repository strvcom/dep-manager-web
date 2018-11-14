import React from 'react'
import Login from './Login'
import Loading from '../components/Loading'
import Nav from './Nav'
import { Redirect, Switch, Route } from 'react-router-dom'
import * as routes from './routes'
import { useQuery } from '../utils/hooks'
import { AUTH_QUERY, AuthQueryResponse } from '../data/Auth'

const Dashboard = React.lazy(() => import('./Dashboard'))

const App = () => {
  const { data } = useQuery<AuthQueryResponse>({
    query: AUTH_QUERY,
    fetchPolicy: 'cache-only'
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
          render={() => {
            return (
              <React.Suspense fallback={<Loading />}>
                <Nav />
                <Dashboard />
              </React.Suspense>
            )
          }}
        />
      )}
    </Switch>
  )
}

export default App
