import gql from 'graphql-tag'
import { Auth } from './types'

export const AUTH_QUERY = gql`
  query Auth {
    auth @client {
      token
    }
  }
`

export interface AuthQueryResponse {
  auth: Auth
}
