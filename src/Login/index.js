// @flow
import React from "react";
import { withHandlers } from "recompose";
import netlify from "netlify-auth-providers";

const Login = ({ handleLogin }: { handleLogin: Function }) => (
  <div>
    Login<button onClick={handleLogin}>Login</button>
  </div>
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
