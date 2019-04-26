import React, { FunctionComponent } from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { LocationDescriptor } from 'history'

import CurrentUserContainer from './CurrentUserContainer'

interface IProps extends RouteProps {
  redirect?: LocationDescriptor
}

const PublicRoute: FunctionComponent<IProps> = ({
  redirect,
  ...rest
}: IProps): JSX.Element => (
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
