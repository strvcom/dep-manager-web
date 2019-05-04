import React, { FunctionComponent } from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { LocationDescriptor } from 'history'

import CurrentUserContainer from './CurrentUserContainer'

interface IProps extends RouteProps {
  redirect?: LocationDescriptor
  loading?: React.ReactNode
}

const PublicRoute: FunctionComponent<IProps> = ({ redirect, loading, ...rest }: IProps) => (
  <CurrentUserContainer>
    {({ user, loading: isLoading }) => {
      if (isLoading) return loading

      return user && redirect ? <Redirect to={redirect} /> : <Route {...rest} />
    }}
  </CurrentUserContainer>
)

PublicRoute.defaultProps = {
  loading: null,
}

export default PublicRoute
