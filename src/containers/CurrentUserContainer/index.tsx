import React from 'react'

import { CurrentUserContainerProps as Props, Result } from './types'
import AuthenticatedQuery from '../AuthenticatedQuery'
import { CURRENT_USER_QUERY } from './query.gql'

const CurrentUserContainer = ({ children, ...rest }: Props) => (
  <AuthenticatedQuery query={CURRENT_USER_QUERY} {...rest}>
    {({ data: { user } = { user: undefined }, loading, ...result }: Result) =>
      children({ user, loading, ...result })
    }
  </AuthenticatedQuery>
)

export default CurrentUserContainer
