import gql from 'graphql-tag'

export const AUTH_QUERY = gql`
  query AuthQuery {
    auth @client {
      token
    }
  }
`
export const CHANGE_TOKEN = gql`
  mutation ChangeToken($token: String!) {
    changeToken(token: $token) @client {
      token
    }
  }
`
