import React from 'react'
import { withHandlers } from 'recompose'
import styled from 'styled-components'
import Logo from '../../assets/Icons/Logo'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: #111517;
  padding: 310px 0;
`

const LoginButton = styled.button`
  height: 70px;
  width: 550px;
  margin-top: 150px;
  background: white;
  color: #111517;
  font-family: "Maison Neue";
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 2px;
  line-height: 19px;
  text-transform: uppercase;
`


const Login = (props: LoginProps) => (
  <Wrapper>
    <Logo />
    <LoginButton onClick={props.onLogin}>Login with github</LoginButton>
  </Wrapper>
)

const githubUrl = `https://github.com/login/oauth/authorize?client_id=${
  process.env.GITHUB_CLIENT_ID
}`

export interface LoginProps {
  onLogin?: (evt: React.MouseEvent) => void
}

export default withHandlers({
  onLogin: (props: LoginProps) => (evt: React.MouseEvent) => location.replace(githubUrl),
})(Login)
