import { set, get } from 'lodash'
import { createAppAuth } from '@octokit/auth-app'
import { Octokit } from '@octokit/rest'

import * as env from '../../../config/env'

const requiredEnvVars = [
  'GITHUB_ORG_ID',
  'GITHUB_APP_ID',
  'GITHUB_APP_CLIENT_ID',
  'GITHUB_APP_CLIENT_SECRET',
  'GITHUB_APP_PRIVATE_KEY',
  'GITHUB_APP_INSTALLATION_ID',
]

if (env.NODE_ENV === 'production') {
  for (const name of requiredEnvVars) {
    if (!env[name]) {
      throw new Error(`"${name}" environment variable is required`)
    }
  }
}

const octokit = new Octokit()

const auth = createAppAuth({
  id: env.GITHUB_APP_ID,
  privateKey: env.GITHUB_APP_PRIVATE_KEY,
  installationId: env.GITHUB_APP_INSTALLATION_ID,
  clientId: env.GITHUB_APP_CLIENT_ID,
  clientSecret: env.GITHUB_APP_CLIENT_SECRET,
})

const authorize = async (context: object) => {
  const userToken = get(context, 'aws.event.headers.authorization')

  if (!userToken) {
    throw new Error('No authorization token provided')
  }

  try {
    const membership = await octokit.orgs.getMembershipForAuthenticatedUser({
      org: env.GITHUB_ORG_ID,
      headers: { authorization: userToken },
    })

    if (membership.data.state !== 'active') {
      throw new Error('Membership not found')
    }
    const { token: installationToken } = await auth({ type: 'installation' })

    return set(context, 'headers.authorization', `Bearer ${installationToken}`)
  } catch {
    throw new Error(`Not authorized to access ${env.GITHUB_ORG_ID} repositories.`)
  }
}

export { authorize }
