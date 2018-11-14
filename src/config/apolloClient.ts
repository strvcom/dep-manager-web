import ApolloClient from 'apollo-boost'
import { AUTH_QUERY, AuthQueryResponse } from '../data/Auth'
import Mutation from '../data/Mutation/resolvers'

export const GITHUB_TOKEN_KEY = 'Bida-App-Github-Token'

const defaultState = {
  auth: {
    __typename: 'Auth',
    token: localStorage.getItem(GITHUB_TOKEN_KEY)
  }
}

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  fetchOptions: { credentials: 'include' },
  request: async operation => {
    const { data } = await client.query<AuthQueryResponse>({
      query: AUTH_QUERY
    })
    operation.setContext({
      headers: {
        authorization:
          data && data.auth.token ? `bearer ${data.auth.token}` : null
      }
    })
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) console.log(graphQLErrors)
    if (networkError) console.log(networkError)
  },
  clientState: {
    defaults: defaultState,
    resolvers: {
      Mutation,
      Query: {
        repository: () => console.log('oi')
      },
      Repository: {
        url: () => console.log('oi')
      }
    }
  }
})

client
  .watchQuery<AuthQueryResponse>({ query: AUTH_QUERY })
  .subscribe(({ data: { auth } }) => {
    if (auth && auth.token) localStorage.setItem(GITHUB_TOKEN_KEY, auth.token)
    else localStorage.removeItem(GITHUB_TOKEN_KEY)
  })

export default client
