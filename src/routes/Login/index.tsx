import React from 'react'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import Netlify from 'netlify-auth-providers'
import { RouteComponentProps } from 'react-router-dom'
import { LoginButton, Container } from './styled'
import {
  CHANGE_TOKEN,
  AuthQueryResponse,
  ChangeTokenVariables
} from '../../data/Auth'
import { Mutation } from 'react-apollo'

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

const Login = (props: RouteComponentProps) => (
  <Container>
    <Logo />
    <Mutation<AuthQueryResponse, ChangeTokenVariables> mutation={CHANGE_TOKEN}>
      {changeAuth => (
        <LoginButton
          onClick={() =>
            authenticator.authenticate(
              { provider: 'github', scope: 'read:user, repo' },
              (err, data: NetlifyResponse) => {
                if (err) return alert(`LOGIN ERROR: ${err}`)
                changeAuth({ variables: { token: data.token } })
              }
            )
          }
        >
          Login with github
        </LoginButton>
      )}
    </Mutation>
  </Container>
)

export default Login
