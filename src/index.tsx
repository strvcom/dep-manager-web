import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from './utils/apollo-hooks'
import GlobalStyle from './styles/global'
import 'react-virtualized/styles.css'
import App from './routes'
import registerServiceWorker from './registerServiceWorker'
import apolloClient from './config/apolloClient'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Loading from './components/Loading'
import PropTypes from 'prop-types'

if (process.env.NODE_ENV === 'development') {
  // fixes react-router erroneous prop-types
  ;(Route as any).propTypes.component = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ])
}

ReactDOM.render(
  <React.Suspense fallback={<Loading />}>
    <ApolloProvider client={apolloClient}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
    <GlobalStyle />
  </React.Suspense>,
  document.getElementById('root')
)
registerServiceWorker()
