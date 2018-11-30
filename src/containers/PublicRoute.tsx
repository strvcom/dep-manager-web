import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { LocationDescriptor } from 'history'
import { useAuth } from '../data/Auth'

export interface PublicRouteProps extends RouteProps {
  redirect?: LocationDescriptor
}

const PublicRoute = React.memo(({ redirect, ...rest }: PublicRouteProps) => {
  return useAuth().token && redirect ? (
    <Redirect to={redirect} />
  ) : (
    <Route {...rest} />
  )
})

export default PublicRoute
