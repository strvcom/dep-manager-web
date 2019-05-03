import React from 'react'
import { QueryResult, QueryProps } from 'react-apollo'

import AuthenticatedQuery from '../AuthenticatedQuery'

import CURRENT_USER_QUERY from './query.gql'

import {
  CURRENT_USER_QUERY as IData,
  CURRENT_USER_QUERY_user as IUser,
} from './graphql-types/CURRENT_USER_QUERY'

interface IChildrenResult extends QueryResult {
  user?: IUser
}

interface IProps extends Pick<QueryProps, Exclude<keyof QueryProps, 'query'>> {
  children: (result: IChildrenResult) => JSX.Element | null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CurrentUserContainer = ({ children, ...rest }: IProps): JSX.Element => (
  <AuthenticatedQuery<IData>
    {...rest}
    query={CURRENT_USER_QUERY}
    children={({ data: { user } = { user: undefined }, ...result }) =>
      children({ user, ...result } as IChildrenResult)
    }
  />
)

export default CurrentUserContainer
