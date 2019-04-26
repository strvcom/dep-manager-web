import React, { memo, FunctionComponent } from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { LocationDescriptor } from 'history'

import CurrentUserContainer from './CurrentUserContainer'

interface IProps extends RouteProps {
  redirect: LocationDescriptor
}

const PrivateRoute: FunctionComponent<IProps> = ({
  redirect,
  ...rest
}: IProps): JSX.Element => (
  <CurrentUserContainer>
    {({ user, loading }) =>
      loading ? null : user ? <Route {...rest} /> : <Redirect to={redirect} />
    }
  </CurrentUserContainer>
)

export default memo(PrivateRoute)
