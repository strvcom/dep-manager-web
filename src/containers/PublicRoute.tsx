import React, { FunctionComponent } from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { LocationDescriptor } from 'history'
import { useCurrentUser } from '~app/hooks/useCurrentUser'

interface IProps extends RouteProps {
  redirect?: LocationDescriptor
  loading?: React.ReactElement | null
}

const PublicRoute: FunctionComponent<IProps> = ({
  redirect,
  loading: loadingElement,
  ...rest
}: IProps) => {
  const { data, loading } = useCurrentUser()

  // eslint-disable-next-line no-extra-parens
  return loading ? (
    loadingElement || null
  ) : data?.user && redirect ? (
    <Redirect to={redirect} />
  ) : (
    <Route {...rest} />
  )
}

PublicRoute.defaultProps = {
  loading: null,
}

export default PublicRoute
