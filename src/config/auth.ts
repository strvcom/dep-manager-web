import { writeStorage } from '@rehooks/local-storage'
import Netlify from 'netlify-auth-providers'

import { NETLIFY_SITE_ID, GITHUB_TOKEN_KEY } from './env'

if (!NETLIFY_SITE_ID) {
  throw new Error(
    `You must define NETLIFY_SITE_ID env in order to start the application`
  )
}

const authenticator = new Netlify({ site_id: NETLIFY_SITE_ID })

interface NetlifyResponse {
  token: string
  scope: string
}

const provider = 'github'
const scope = 'read:gpg_key,read:org,read:public_key,read:repo_hook,repo,user'

export const authenticate = () =>
  authenticator.authenticate(
    { provider, scope },
    (err, data: NetlifyResponse) => {
      if (err) {
        alert('Could not authenticate. Try again later.')
        return console.error(err)
      }

      writeStorage(GITHUB_TOKEN_KEY, data.token)
    }
  )
