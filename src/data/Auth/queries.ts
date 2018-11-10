import gqlLocal from 'graphql-tag'
import { Auth } from './types'

export const AUTH_QUERY = gqlLocal`
  query Auth {
    auth @client {
      token
    }
  }
`

export interface AuthQueryResponse {
  auth: Auth
}
