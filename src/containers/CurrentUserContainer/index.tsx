import React from 'react'
import { QueryResult, QueryProps } from 'react-apollo'
import { Omit } from 'utility-types'

import AuthenticatedQuery from '../AuthenticatedQuery'
import CURRENT_USER_QUERY from './query.gql'

import {
  CURRENT_USER_QUERY as IData,
  CURRENT_USER_QUERY_user as IUser,
} from './graphql-types/CURRENT_USER_QUERY'

interface IChildrenResult extends Omit<QueryResult<IData>, 'data'> {
  user?: IUser
}

interface IProps extends Omit<QueryProps<IData>, 'query' | 'children'> {
  children: (result: IChildrenResult) => React.ReactNode
}

const CurrentUserContainer = ({ children, ...rest }: IProps) => (
  <AuthenticatedQuery<IData>
    {...rest}
    query={CURRENT_USER_QUERY}
    children={({ data: { user } = { user: undefined }, ...result }) =>
      children({ user, ...result })
    }
  />
)

export default CurrentUserContainer
