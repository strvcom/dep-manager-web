import React, { FunctionComponent } from 'react'
import { QueryResult } from 'react-apollo'

import AuthenticatedQuery from '../AuthenticatedQuery'
import { CURRENT_USER_QUERY } from './query.gql'

interface IChildrenArgument {
  user?: object
  loading: boolean
}

interface IProps {
  children: (result: IChildrenArgument) => JSX.Element
}

interface IData {
  user: { id: string, name: string } | undefined
}

interface IResult extends QueryResult {
  data: IData
  loading: boolean
}

const CurrentUserContainer: FunctionComponent<IProps> = ({
  children,
  ...rest
}: IProps): JSX.Element => (
  <AuthenticatedQuery query={CURRENT_USER_QUERY} {...rest}>
    {({ data: { user } = { user: undefined }, loading, ...result }: IResult) =>
      children({ user, loading, ...result })
    }
  </AuthenticatedQuery>
)

export default CurrentUserContainer
