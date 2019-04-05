import { GraphQLSchema } from 'graphql'
import { makeRemoteExecutableSchema, introspectSchema } from 'graphql-tools'
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

const link = new HttpLink({
  uri: 'https://api.github.com/graphql',
  fetch,
  headers: { authorization }
})

/**
 * Creates a remote schema based on GitHub GraphQL API.
 */
export const createSchema = async (): Promise<GraphQLSchema> =>
  makeRemoteExecutableSchema({
    schema: await introspectSchema(link),
    link
  })

// export { createSchema }

// import {
//   InMemoryCache,
//   IntrospectionFragmentMatcher
// } from 'apollo-cache-inmemory'
// import { HttpLink } from 'apollo-link-http'
// import { onError } from 'apollo-link-error'
// import { ApolloLink } from 'apollo-link'
// import { AUTH_QUERY } from '../data/Auth'
// import { AuthQuery } from '../data/Auth/__generated-types/AuthQuery'
// import { data as introspectionQueryResultData } from './introspection-schema.json'
// export const GITHUB_TOKEN_KEY = 'Bida-App-Github-Token'

// export const cache = new InMemoryCache({
//   fragmentMatcher: new IntrospectionFragmentMatcher({
//     introspectionQueryResultData
//   })
// })

// const authLink = new ApolloLink((operation, forward) => {
//   const {
//     authentication: { token }
//   }: any = cache.readQuery<AuthQuery>({ query: AUTH_QUERY })
//   operation.setContext({
//     headers: { authorization: token ? `bearer ${token}` : null }
//   })
//   return forward!(operation)
// })

// const httpLink = new HttpLink({
//   uri: 'https://api.github.com/graphql'
// })

// const errorLink = onError(
//   ({ graphQLErrors, networkError, forward, operation }) => {
//     if (graphQLErrors) {
//       graphQLErrors.forEach(error => {
//         console.error('[GraphQL Error]', error.message)
//       })
//     }
//     if (networkError) console.error('[Network Error]', networkError.message)
//     return forward(operation)
//   }
// )

// export default ApolloLink.from([authLink, errorLink, httpLink])
