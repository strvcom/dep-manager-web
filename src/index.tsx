import './utils/react-router-fix'
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from './utils/apollo-hooks'
import GlobalStyle from './styles/global'
import 'react-virtualized/styles.css'
import App from './routes'
import registerServiceWorker from './registerServiceWorker'
import apolloClient from './config/apolloClient'
import { BrowserRouter as Router } from 'react-router-dom'
import Loading from './components/Loading'

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
