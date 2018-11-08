import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import { AUTH_QUERY, AuthQueryResponse, Auth, changeToken } from '../data/Auth'

export const cache = new InMemoryCache({
  dataIdFromObject: object => object.__typename
})

export const GITHUB_TOKEN_KEY = 'Bida-App-Github-Token'

cache.watch({
  query: AUTH_QUERY,
  optimistic: true,
  callback: ({ result: { auth } }: { result: AuthQueryResponse }) => {
    if (auth && auth.token) localStorage.setItem(GITHUB_TOKEN_KEY, auth.token)
    else localStorage.removeItem(GITHUB_TOKEN_KEY)
  }
})

export interface State {
  auth: Auth
}

export const defaultState: State = {
  auth: {
    __typename: 'Auth',
    token: localStorage.getItem(GITHUB_TOKEN_KEY)
  }
}

export const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers: {
    Mutation: {
      changeToken
    }
  }
})
