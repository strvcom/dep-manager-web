import gqlLocal from 'graphql-tag'

export const AUTH_QUERY = gqlLocal`
  query AuthQuery {
    auth @client {
      token
    }
  }
`
