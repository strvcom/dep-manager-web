import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider, Query } from 'react-apollo'
import GlobalStyles from './styles/globalStyles'
import 'react-virtualized/styles.css'
import App from './routes'
import registerServiceWorker from './registerServiceWorker'
import apolloClient from './config/apolloClient'
import { BrowserRouter as Router } from 'react-router-dom'
import { AUTH_QUERY, AuthQueryResponse } from './data/Auth'

ReactDOM.render(
  <React.Fragment>
    <ApolloProvider client={apolloClient}>
      <Router>
        <Query<AuthQueryResponse> query={AUTH_QUERY}>
          {({ data }) => <App token={data && data.auth.token} />}
        </Query>
      </Router>
    </ApolloProvider>
    <GlobalStyles />
  </React.Fragment>,
  document.getElementById('root')
)
registerServiceWorker()
