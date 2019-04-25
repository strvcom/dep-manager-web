import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import GlobalStyle from './styles/global'
import 'react-virtualized/styles.css'
import App from './routes'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Loading from './components/Loading'
import PropTypes from 'prop-types'

import { client } from './config/client'

if (process.env.NODE_ENV === 'development') {
  const RouteComponent = Route as any

  // fixes react-router erroneous prop-types
  // eslint-disable-next-line react/forbid-foreign-prop-types
  RouteComponent.propTypes.component = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ])
}

ReactDOM.render(
  <React.Suspense fallback={<Loading />}>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
    <GlobalStyle />
  </React.Suspense>,
  document.getElementById('root')
)

registerServiceWorker()
