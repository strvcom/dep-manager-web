/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_NETLIFY_SITE_ID: string
    NODE_ENV: 'development' | 'production' | 'test'
    REACT_APP_GRAPHQL_ENDPOINT: 'string'
    PUBLIC_URL: string
    GITHUB_TOKEN_KEY: string
  }
}
