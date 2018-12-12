import React from 'react'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { RouteComponentProps } from 'react-router-dom'
import { LoginButton, Container } from './styled'
import { useAuthenticator } from '../../data/Auth'
import { ThemeProvider } from '../../styles/styled'
import darkTheme from '../../styles/themes/dark'

const Login = (props: RouteComponentProps) => (
  <ThemeProvider theme={darkTheme}>
    <Container>
      <Logo />
      <LoginButton onClick={useAuthenticator()}>Log in with github</LoginButton>
    </Container>
  </ThemeProvider>
)

export default React.memo(Login)
