import React from 'react'
import { Query, QueryProps } from 'react-apollo'
import { useLocalStorage } from '@rehooks/local-storage'

import { GITHUB_TOKEN_KEY } from '../../config/env'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AuthenticatedQuery<IData = any, IVariables = any>({
  skip,
  context,
  ...rest
}: QueryProps<IData, IVariables>): JSX.Element {
  const [token] = useLocalStorage(GITHUB_TOKEN_KEY)

  class AuthQuery extends Query<IData, IVariables> {}

  return (
    <AuthQuery
      skip={skip || !token}
      context={{ token, ...context }}
      {...rest}
    />
  )
}

export default AuthenticatedQuery
