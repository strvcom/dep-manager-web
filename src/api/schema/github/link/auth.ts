import { ApolloLink } from 'apollo-link'

import { debug } from '../../../debug'
import { GITHUB_OAUTH_TOKEN } from '../../../../config/env'

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

const link = new ApolloLink((operation, forward) => {
  const { graphqlContext: { token } = { token: null } } = operation.getContext()

  operation.setContext({
    headers: {
      // either use token, or global authentication method.
      authorization: token ? `bearer ${token}` : authorization
    }
  })

  return forward!(operation)
})

export { link }
