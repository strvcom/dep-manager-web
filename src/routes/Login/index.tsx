import React, { FunctionComponent } from 'react'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { LoginButton, Container } from './styled'
import { authenticate } from '../../config/auth'
import { ThemeProvider } from 'styled-components'
import darkTheme from '../../styles/themes/dark'

const Login: FunctionComponent = (): JSX.Element => (
  <ThemeProvider theme={darkTheme}>
    <Container>
      <Logo />
      <LoginButton onClick={authenticate}>Log in with github</LoginButton>
    </Container>
  </ThemeProvider>
)

export default React.memo(Login)
