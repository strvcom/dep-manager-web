import React from 'react'
import { Query } from 'react-apollo'
import { useLocalStorage } from '@rehooks/local-storage'

import { GITHUB_TOKEN_KEY } from '../../config/env'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthenticatedQuery = ({ skip, context, ...rest }: any): JSX.Element => {
  const [token] = useLocalStorage(GITHUB_TOKEN_KEY)

  return (
    <Query skip={skip || !token} context={{ token, ...context }} {...rest} />
  )
}

export default AuthenticatedQuery
