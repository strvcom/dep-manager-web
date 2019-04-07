import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-fetch'

import { debug } from '../../debug'
import { GITHUB_OAUTH_TOKEN } from '../../../config/env'

/**
 * Fixed authorization method, used only for local development of the API.
 * On the application itself, authentication is managed using Netlify auth
 * providers with a local storing of tokens.
 */
const authorization = GITHUB_OAUTH_TOKEN
  ? `bearer ${GITHUB_OAUTH_TOKEN}`
  : undefined

if (authorization) {
  debug('Using fixed authentication token %o', authorization)
}

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
  fetch,
  headers: { authorization }
})

const authLink = new ApolloLink((operation, forward) => {
  const { graphqlContext: { token } = { token: null } } = operation.getContext()

  if (token) {
    operation.setContext({
      headers: { authorization: `bearer ${token}` }
    })
  }

  return forward!(operation)
})

const link = ApolloLink.from([authLink, httpLink])

export { link }
