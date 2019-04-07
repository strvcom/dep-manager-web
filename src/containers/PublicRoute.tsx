import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { LocationDescriptor } from 'history'

import CurrentUserContainer from './CurrentUserContainer'

export interface PublicRouteProps extends RouteProps {
  redirect?: LocationDescriptor
}

const PublicRoute = ({ redirect, ...rest }: PublicRouteProps) => (
  <CurrentUserContainer>
    {({ user, loading }) =>
      loading ? null : user && redirect ? (
        <Redirect to={redirect} />
      ) : (
        <Route {...rest} />
      )
    }
  </CurrentUserContainer>
)

export default PublicRoute
