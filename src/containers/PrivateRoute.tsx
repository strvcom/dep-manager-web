import React, { memo, FunctionComponent } from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { LocationDescriptor } from 'history'

import CurrentUserContainer from './CurrentUserContainer'

interface IProps extends RouteProps {
  redirect: LocationDescriptor
  loading?: React.ReactNode
}

const PrivateRoute: FunctionComponent<IProps> = ({ redirect, loading, ...rest }: IProps) => (
  <CurrentUserContainer>
    {({ user, loading: isLoading }) => {
      if (isLoading) return loading

      return user ? <Route {...rest} /> : <Redirect to={redirect} />
    }}
  </CurrentUserContainer>
)

PrivateRoute.defaultProps = {
  loading: null,
}

export default memo(PrivateRoute)
