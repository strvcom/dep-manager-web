import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import GlobalStyles from './globalStyles'
import 'react-virtualized/styles.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import apolloClient from './config/apolloClient'

ReactDOM.render(
  <React.Fragment>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
    <GlobalStyles />
  </React.Fragment>,
  document.getElementById('root'),
)
registerServiceWorker()
