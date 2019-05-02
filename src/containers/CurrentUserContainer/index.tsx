import React from 'react'
import { QueryResult, QueryProps } from 'react-apollo'

import AuthenticatedQuery from '../AuthenticatedQuery'

import CURRENT_USER_QUERY, {
  CURRENT_USER_QUERYQueryData,
  CURRENT_USER_QUERYQueryPartialData,
} from './query.gql'

interface IChildrenResult
  extends QueryResult,
    CURRENT_USER_QUERYQueryPartialData {}

interface IProps extends Pick<QueryProps, Exclude<keyof QueryProps, 'query'>> {
  children: (result: IChildrenResult) => JSX.Element | null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CurrentUserContainer = ({ children, ...rest }: IProps): JSX.Element => (
  <AuthenticatedQuery<CURRENT_USER_QUERYQueryData>
    {...rest}
    query={CURRENT_USER_QUERY}
    children={({ data: { user } = { user: undefined }, ...result }) =>
      children({ user, ...result } as IChildrenResult)
    }
  />
)

export default CurrentUserContainer
