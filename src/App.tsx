import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { BrowserRouter as Router } from 'react-router-dom'
import { ME_QUERY } from './data/queries'
import Login from './containers/Login'
import Dashboard from './containers/Dashboard'
import Loading from './components/Loading'
import Nav from './components/Nav'

interface AppProps {
  token?: string | null
}

export default function App({ token }: AppProps) {
  if (!token) {
    return <Login />
  }
  return (
    <Query query={ME_QUERY} fetchPolicy="network-only">
      {({ client, loading, error, data }) => {
        if (error) {
          client.resetStore()
          return <Login />
        }
        if (loading) {
          return <Loading />
        }
        if (data && data.viewer) {
          return (
            <Router>
              <Fragment>
                <Nav />
                <Dashboard />
              </Fragment>
            </Router>
          )
        }
        return <Login />
      }}
    </Query>
  )
}
