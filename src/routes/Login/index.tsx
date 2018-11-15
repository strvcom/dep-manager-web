import React, { useCallback } from 'react'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import Netlify from 'netlify-auth-providers'
import { RouteComponentProps } from 'react-router-dom'
import { LoginButton, Container } from './styled'
import {
  CHANGE_TOKEN,
  AuthQueryResponse,
  ChangeTokenVariables
} from '../../data/Auth'
import { useMutation } from '../../utils/apollo-hooks'

const options =
  process.env.NODE_ENV === 'production'
    ? {}
    : // eslint-disable-next-line camelcase
    { site_id: process.env.REACT_APP_SITE_ID }

const authenticator = new Netlify(options)

interface NetlifyResponse {
  token: string
  scope: string
}

const Login = (props: RouteComponentProps) => {
  const changeAuth = useMutation<AuthQueryResponse, ChangeTokenVariables>(
    CHANGE_TOKEN
  )
  const handleClick = useCallback(
    () =>
      authenticator.authenticate(
        { provider: 'github', scope: 'read:user,repo' },
        (err, data: NetlifyResponse) => {
          if (err) return alert(`LOGIN ERROR: ${err}`)
          changeAuth({ variables: { token: data.token } })
        }
      ),
    [changeAuth]
  )
  return (
    <Container>
      <Logo />
      <LoginButton onClick={handleClick}>Login with github</LoginButton>
    </Container>
  )
}

export default React.memo(Login)
