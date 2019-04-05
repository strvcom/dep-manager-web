import { ApolloClient } from 'apollo-client'
import { AUTH_QUERY } from '../data/Auth'
import link, { cache, GITHUB_TOKEN_KEY } from './link'
import { AuthQuery } from '../data/Auth/__generated-types/AuthQuery'
import typeDefs from '../data/typeDefs'
import resolvers from './resolvers'

const client = new ApolloClient({
  link,
  cache,
  typeDefs,
  resolvers
})

client.writeQuery({
  query: AUTH_QUERY,
  data: {
    authentication: {
      __typename: 'BidaAuthentication',
      token: localStorage.getItem(GITHUB_TOKEN_KEY)
    }
  }
} as any)

client
  .watchQuery<AuthQuery>({ query: AUTH_QUERY })
  .subscribe(({ data: { authentication } }) => {
    if (authentication && authentication.token) {
      localStorage.setItem(GITHUB_TOKEN_KEY, authentication.token)
    } else localStorage.removeItem(GITHUB_TOKEN_KEY)
  })

export default client
