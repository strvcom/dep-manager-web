import gqlLocal from 'graphql-tag'

export const CHANGE_TOKEN = gqlLocal`
  mutation ChangeToken($token: String!) {
    changeToken(token: $token) @client
  }
`

export interface ChangeTokenVariables {
  token: string
}
