import React from 'react'
import { Query, QueryProps, OperationVariables as OV } from 'react-apollo'
import { useLocalStorage } from '@rehooks/local-storage'

import { GITHUB_TOKEN_KEY } from '../../config/env'

function AuthenticatedQuery<Data = unknown, Variables extends OV = OV>(
  props: QueryProps<Data, Variables>
) {
  const [token] = useLocalStorage(GITHUB_TOKEN_KEY)
  const skip = props.skip || !token
  const context = { token, ...props.context }

  return <Query<Data, Variables> {...props} skip={skip} context={context} />
}

export default AuthenticatedQuery
