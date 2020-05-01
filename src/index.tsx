import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { GraphQLProvider } from '~api/client'
import GlobalStyle from './styles/global'
import Loading from './components/Loading'
import registerServiceWorker from './registerServiceWorker'
import App from './routes'

import 'react-virtualized/styles.css'

if (process.env.NODE_ENV === 'development') {
  // Fix bug of errouneous prop-types on Route component
  // eslint-disable-next-line react/forbid-foreign-prop-types
  Route.propTypes.component = PropTypes.oneOfType([PropTypes.func, PropTypes.object])
}

ReactDOM.render(
  <React.Suspense fallback={<Loading />}>
    <GraphQLProvider>
      <Router>
        <App />
      </Router>
    </GraphQLProvider>

    <GlobalStyle />
  </React.Suspense>,
  document.getElementById('root')
)

registerServiceWorker()
