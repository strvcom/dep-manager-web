import React, { memo } from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { LocationDescriptor } from 'history'
import { useCurrentUser } from '~app/hooks/useCurrentUser'

interface IProps extends RouteProps {
  redirect: LocationDescriptor
  loading?: React.ReactElement | null
}

const PrivateRoute: React.FC<IProps> = ({ redirect, loading: loadingElement, ...rest }: IProps) => {
  const { data, loading } = useCurrentUser()

  // eslint-disable-next-line no-extra-parens
  return loading ? (
    loadingElement || null
  ) : data?.user ? (
    <Route {...rest} />
  ) : (
    <Redirect to={redirect} />
  )
}

PrivateRoute.defaultProps = {
  loading: null,
}

export default memo(PrivateRoute)
