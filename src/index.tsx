import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import GlobalStyles from './styles/globalStyles'
import 'react-virtualized/styles.css'
import App from './routes'
import registerServiceWorker from './registerServiceWorker'
import apolloClient from './config/apolloClient'
import {BrowserRouter as Router} from 'react-router-dom'
import {QueryAuth} from './data/Auth'

ReactDOM.render(
  <React.Fragment>
    <ApolloProvider client={apolloClient}>
      <Router>
        <QueryAuth>
          {({data}) => <App token={data && data.auth.token}/>}
        </QueryAuth>
      </Router>
    </ApolloProvider>
    <GlobalStyles />
  </React.Fragment>,
  document.getElementById('root'),
)
registerServiceWorker()
