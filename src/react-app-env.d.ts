/// <reference types="react-scripts" />
'use strict'

// eslint-disable-next-line typescript/no-namespace
declare namespace NodeJS {
  interface ProcessEnv {
    GITHUB_CLIENT_ID: string
  }
}
