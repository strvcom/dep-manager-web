import React, { memo } from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { LocationDescriptor } from 'history'

import CurrentUserContainer from './CurrentUserContainer'

export interface PrivateRouteProps extends RouteProps {
  redirect: LocationDescriptor
}

const PrivateRoute = ({ redirect, ...rest }: PrivateRouteProps) => (
  <CurrentUserContainer>
    {({ user, loading }) =>
      loading ? null : user ? <Route {...rest} /> : <Redirect to={redirect} />
    }
  </CurrentUserContainer>
)

export default memo(PrivateRoute)
