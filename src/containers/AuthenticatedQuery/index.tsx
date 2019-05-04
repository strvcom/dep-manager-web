import React from 'react'
import { Query, QueryProps } from 'react-apollo'
import { useLocalStorage } from '@rehooks/local-storage'

import { GITHUB_TOKEN_KEY } from '../../config/env'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AuthenticatedQuery<IData = any, IVariables = any>(props: QueryProps<IData, IVariables>) {
  const [token] = useLocalStorage(GITHUB_TOKEN_KEY)
  const skip = props.skip || !token
  const context = { token, ...props.context }

  return <Query<IData, IVariables> {...props} skip={skip} context={context} />
}

export default AuthenticatedQuery
