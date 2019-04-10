import { writeStorage } from '@rehooks/local-storage'
import Netlify from 'netlify-auth-providers'

import { REACT_APP_SITE_ID } from '../../config/env'
import { GITHUB_TOKEN_KEY } from '../../config/link'

const options =
  process.env.NODE_ENV === 'development' ? { site_id: REACT_APP_SITE_ID } : {}

const authenticator = new Netlify(options)

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
