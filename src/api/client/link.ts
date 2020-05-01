import scope from 'debug'
import { ApolloLink, HttpLink } from '@apollo/client'
import fetch from 'isomorphic-fetch'
import { REACT_APP_GRAPHQL_ENDPOINT } from '~app/config/env'
import { getAuthenticationToken } from '~app/config/auth'

const debugScope = scope('bida:api:github')

/**
 * Debugger link for logging.
 */
const debug = new ApolloLink((operation, forward) => {
  const { operationName, variables } = operation

  debugScope('query: %s %o', operationName, variables)

  return forward(operation)
})

/**
 * Authentication link.
 */
const auth = new ApolloLink((operation, forward) => {
  const token = getAuthenticationToken()

  if (token) {
    operation.setContext({ headers: { authorization: `bearer ${token}` } })
  }

  return forward(operation)
})

/**
 * HTTP requesting link.
 */
const http = new HttpLink({ uri: REACT_APP_GRAPHQL_ENDPOINT, fetch })

/**
 * Resulting application link.
 */
const link = ApolloLink.from([debug, auth, http])

// @tests
export { debug, auth, http }

export { link }
