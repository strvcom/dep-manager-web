import React from 'react'
import { QueryResult } from 'react-apollo'

import AuthenticatedQuery from '../AuthenticatedQuery'
import { CURRENT_USER_QUERY } from './query.gql'

interface IData {
  user: { id: string, name: string } | undefined
}

interface IResult {
  data: IData
}

interface IChildrenResult
  extends QueryResult<{
    user?: object
  }> {
  user?: object
}

type IChildren = (result: IChildrenResult) => React.ReactNode

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CurrentUserContainer = ({
  children,
  ...rest
}: {
  children: IChildren
}): JSX.Element => (
  <AuthenticatedQuery query={CURRENT_USER_QUERY} {...rest}>
    {({ data: { user } = { user: undefined }, ...result }: IResult) =>
      children({ user, ...result } as IChildrenResult)
    }
  </AuthenticatedQuery>
)

export default CurrentUserContainer
