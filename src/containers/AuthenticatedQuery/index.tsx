import React from 'react'
import { Query } from 'react-apollo'
import { useLocalStorage } from '@rehooks/local-storage'

import { GITHUB_TOKEN_KEY } from '../../config/link'

const AuthenticatedQuery = ({ skip, context, ...rest }: any) => {
  const [token] = useLocalStorage(GITHUB_TOKEN_KEY)

  return (
    <Query skip={skip || !token} context={{ token, ...context }} {...rest} />
  )
}

export default AuthenticatedQuery
