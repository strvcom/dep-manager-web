import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import CSSReset from './styles/reset'
import GlobalStyle from './styles/global'
import 'react-virtualized/styles.css'
import App from './routes'
import registerServiceWorker from './registerServiceWorker'
import apolloClient from './config/apolloClient'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <React.Fragment>
    <ApolloProvider client={apolloClient}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
    <CSSReset />
    <GlobalStyle />
  </React.Fragment>,
  document.getElementById('root')
)
registerServiceWorker()
