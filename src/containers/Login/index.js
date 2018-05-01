// @flow
import React from "react";
import { withHandlers } from "recompose";
import netlify from "netlify-auth-providers";
import styled from "styled-components";

import Logo from "../../assets/Icons/Logo";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: #111517;
  padding: 310px 0;
`;

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
`;

const Login = ({ handleLogin }: { handleLogin: Function }) => (
  <Wrapper>
    <Logo />
    <LoginButton onClick={handleLogin}>Login with github</LoginButton>
  </Wrapper>
);

const options =
  process.env.NODE_ENV === "production"
    ? {}
    : { site_id: process.env.REACT_APP_SITE_ID };

const authenticator = new netlify(options);

export default withHandlers({
  handleLogin: ({ setToken }) => () => {
    authenticator.authenticate(
      { provider: "github", scope: "read:user, repo" },
      (err: any, data: any) => {
        if (err) {
          return alert(`LOGIN ERROR: ${err}`);
        }
        const { token } = data;
        localStorage.setItem("token", token);
        setToken(token);
      }
    );
  }
})(Login);
