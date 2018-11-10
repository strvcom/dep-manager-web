import React from 'react'
import Login from './Login'
import Loading from '../components/Loading'
import Nav from './Nav'
import { Redirect, Switch, Route } from 'react-router-dom'
import * as routes from './routes'
import { Query } from 'react-apollo'
import { VIEWER_QUERY } from '../data/Viewer'
import { Me } from '../data/types'

const Dashboard = React.lazy(() => import('./Dashboard'))

interface AppProps {
  token?: string | null
}
export default function App ({ token }: AppProps) {
  return (
    <Switch>
      {token && <Redirect to={routes.root} from={routes.login} />}
      <Route path={routes.login} render={Login} />
      {!token && <Redirect to={routes.login} />}
      {token && (
        <Route
          path={routes.root}
          render={() => (
            <React.Fragment>
              <Nav />
              <React.Suspense fallback={<Loading />}>
                <Query<Me> query={VIEWER_QUERY} fetchPolicy='network-only'>
                  {({ loading, error, data }) => {
                    if (error) return error.stack || error.message
                    if (loading) return <Loading />
                    if (data && data.viewer) return <Dashboard />
                    return <Redirect to={routes.login} />
                  }}
                </Query>
              </React.Suspense>
            </React.Fragment>
          )}
        />
      )}
    </Switch>
  )
}
