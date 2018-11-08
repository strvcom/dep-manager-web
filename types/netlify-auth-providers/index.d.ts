/* eslint-disable strict */
declare module 'netlify-auth-providers' {
  export interface NetlifyOptions {
    site_id?: string
  }
  export interface AuthenticateOptions {
    provider: string
    scope?: string
  }
  export default class Netlify {
    constructor (options: NetlifyOptions)
    public authenticate (
      options: AuthenticateOptions,
      cb: (err?: any, data: any) => void
    ): void
  }
}
/* eslint-enable strict */
