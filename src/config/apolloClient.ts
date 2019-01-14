import { ApolloClient } from 'apollo-client'
import { AUTH_QUERY } from '../data/Auth'
import link, { cache, GITHUB_TOKEN_KEY } from './link'
import { AuthQuery } from '../data/Auth/__generated-types/AuthQuery'
import typeDefs from '../data/typeDefs'
import resolvers from './resolvers'

const client = new ApolloClient({
  link,
  cache,
  connectToDevTools: true,
  typeDefs,
  resolvers,
  initializers: {
    authentication: () => ({
      __typename: 'Authentication',
      token: localStorage.getItem(GITHUB_TOKEN_KEY)
    })
  }
})

client
  .watchQuery<AuthQuery>({ query: AUTH_QUERY })
  .subscribe(({ data: { authentication } }) => {
    if (authentication && authentication.token) {
      localStorage.setItem(GITHUB_TOKEN_KEY, authentication.token)
    } else localStorage.removeItem(GITHUB_TOKEN_KEY)
  })

export default client
