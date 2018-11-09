import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { from } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { cache, stateLink } from './state'
import { AuthQueryResponse, AUTH_QUERY } from '../data/Auth'

const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' })
const authLink = setContext(async (request, context) => {
  const { data } = await client.query<AuthQueryResponse>({ query: AUTH_QUERY })
  return {
    ...context,
    headers: {
      ...context.headers,
      authorization:
        data && data.auth.token ? `bearer ${data.auth.token}` : null
    }
  }
})

const client = new ApolloClient({
  cache,
  link: from([stateLink, authLink, httpLink])
})

export default client
