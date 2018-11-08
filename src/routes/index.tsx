import React from 'react'
import { QueryViewer } from '../data/Viewer'
import Login from './Login'
import Loading from '../components/Loading'
import Nav from './Nav'
import { Redirect, Switch, Route } from 'react-router-dom'
import * as routes from './routes'

const Dashboard = React.lazy(() => import('./Dashboard'))

interface AppProps {
  token?: string | null
}
export default function App({ token }: AppProps) {
  return <Switch>
    {token && <Redirect to={routes.root} from={routes.login}/>}
    <Route path={routes.login} render={Login}/>
    {!token && <Redirect to={routes.login}/>}
    {token && <Route path={routes.root} render={() => (
      <>
        <Nav/>
        <React.Suspense fallback={<Loading/>}>
          <QueryViewer fetchPolicy="network-only">
            {({ loading, error, data }) => {
              if (error) return error.stack || error.message
              if (loading) return <Loading />
              if (data && data.viewer) return <Dashboard/>
              return <Redirect to={routes.login}/>
            }}
          </QueryViewer>
        </React.Suspense>
      </>
    )}/>}
  </Switch>
}
