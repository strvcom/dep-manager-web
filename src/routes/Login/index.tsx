import React from 'react'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { RouteComponentProps } from 'react-router-dom'
import { LoginButton, Container } from './styled'
import { useAuthenticator } from '../../data/Auth'

const Login = (props: RouteComponentProps) => (
  <Container>
    <Logo />
    <LoginButton onClick={useAuthenticator()}>Login with github</LoginButton>
  </Container>
)

export default React.memo(Login)
