import React from 'react'
import gql from 'graphql-tag'

import { CurrentUserContainerProps as Props, Result } from './types'
import AuthenticatedQuery from '../AuthenticatedQuery'

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    user: viewer {
      id
      name
    }
  }
`

const CurrentUserContainer = ({ children, ...rest }: Props) => (
  <AuthenticatedQuery query={CURRENT_USER_QUERY} {...rest}>
    {({ data: { user } = { user: undefined }, loading, ...result }: Result) =>
      children({ user, loading, ...result })
    }
  </AuthenticatedQuery>
)

export default CurrentUserContainer
