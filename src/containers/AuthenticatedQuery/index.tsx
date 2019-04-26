import React, { FunctionComponent, ReactNode } from 'react'
import { Query, QueryResult, OperationVariables } from 'react-apollo'
import { useLocalStorage } from '@rehooks/local-storage'

import { GITHUB_TOKEN_KEY } from '../../config/env'

interface IProps {
  skip?: boolean
  context?: object
  children: (result: QueryResult<any, OperationVariables>) => ReactNode
  query: any
}

const AuthenticatedQuery: FunctionComponent<IProps> = ({
  skip,
  context,
  ...rest
}: IProps): JSX.Element => {
  const [token] = useLocalStorage(GITHUB_TOKEN_KEY)

  return (
    <Query skip={skip || !token} context={{ token, ...context }} {...rest} />
  )
}

export default AuthenticatedQuery
