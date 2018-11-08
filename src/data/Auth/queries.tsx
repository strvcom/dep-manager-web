import * as React from 'react'
import gql from 'graphql-tag'
import { Query, QueryProps } from 'react-apollo'
import {Omit} from 'utility-types'
import {Auth} from './types'

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

export const QueryAuth = (props: Omit<QueryProps<AuthQueryResponse>, 'query'>) => (
  <Query {...props} query={AUTH_QUERY}/>
)
