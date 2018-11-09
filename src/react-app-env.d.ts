/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_GITHUB_CLIENT_ID: string
    REACT_APP_GITHUB_CLIENT_SECRET: string
    REACT_APP_SITE_ID: string
  }
}
