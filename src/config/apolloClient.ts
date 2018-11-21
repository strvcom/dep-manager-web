import { ApolloClient } from 'apollo-client'
import { AUTH_QUERY } from '../data/Auth'
import link, { cache, GITHUB_TOKEN_KEY } from './link'
import { AuthQuery } from '../data/Auth/__generated-types/AuthQuery'

const client = new ApolloClient({
  link,
  cache,
  connectToDevTools: true
})

client
  .watchQuery<AuthQuery>({ query: AUTH_QUERY })
  .subscribe(({ data: { auth } }) => {
    if (auth && auth.token) localStorage.setItem(GITHUB_TOKEN_KEY, auth.token)
    else localStorage.removeItem(GITHUB_TOKEN_KEY)
  })

export default client
