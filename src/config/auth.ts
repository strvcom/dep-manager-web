import { useLocalStorage, writeStorage } from '@rehooks/local-storage'
import Netlify from 'netlify-auth-providers'

import { REACT_APP_NETLIFY_SITE_ID, GITHUB_TOKEN_KEY } from './env'

if (!REACT_APP_NETLIFY_SITE_ID) {
  throw new Error(`You must define REACT_APP_NETLIFY_SITE_ID env in order to start the application`)
}

const authenticator = new Netlify({ site_id: REACT_APP_NETLIFY_SITE_ID })

interface INetlifyResponse {
  token: string
  scope: string
}

const provider = 'github'
const scope = 'read:gpg_key,read:org,read:public_key,read:repo_hook,repo,user'

const authenticate = (): void =>
  authenticator.authenticate({ provider, scope }, (err, data: INetlifyResponse) => {
    if (err) {
      alert('Could not authenticate. Try again later.')
      return console.error(err)
    }

    writeStorage(GITHUB_TOKEN_KEY, data.token)
  })

const useAuthenticationToken = () => useLocalStorage(GITHUB_TOKEN_KEY)
const getAuthenticationToken = () => localStorage.getItem(GITHUB_TOKEN_KEY)

export { authenticate, useAuthenticationToken, getAuthenticationToken }
