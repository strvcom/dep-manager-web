import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { withClientState } from 'apollo-link-state'
import { ApolloLink } from 'apollo-link'
import resolvers from './resolvers'
import { AUTH_QUERY } from '../data/Auth'
import { AuthQuery } from '../data/Auth/__generated-types/AuthQuery'

export const GITHUB_TOKEN_KEY = 'Bida-App-Github-Token'

export const cache = new InMemoryCache({
  dataIdFromObject (result) {
    if (result.__typename) {
      return result.id !== undefined
        ? `${result.__typename}:${result.id}`
        : result.__typename
    }
    return null
  }
})

const stateLink = withClientState({
  defaults: {
    auth: {
      __typename: 'Authentication',
      token: localStorage.getItem(GITHUB_TOKEN_KEY)
    },
    libraries: {
      __typename: 'LibraryCollection'
    }
  },
  resolvers,
  cache
})

const authLink = new ApolloLink((operation, forward) => {
  const data = cache.readQuery<AuthQuery>({ query: AUTH_QUERY })
  operation.setContext({
    headers: {
      authorization:
        data && data.auth.token ? `bearer ${data.auth.token}` : null
    }
  })
  return forward!(operation)
})

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql'
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(error => {
      console.error('[GraphQL Error]', error.message)
    })
  }
  if (networkError) console.error('[Network Error]', networkError.message)
})

export default ApolloLink.from([errorLink, stateLink, authLink, httpLink])
