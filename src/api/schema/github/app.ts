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

const privateKey = (env.GITHUB_APP_PRIVATE_KEY || '').split('\\n').join('\n')

const userOctokit = new Octokit()

const appOctokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    id: env.GITHUB_APP_ID,
    privateKey,
    installationId: env.GITHUB_APP_INSTALLATION_ID,
    clientId: env.GITHUB_APP_CLIENT_ID,
    clientSecret: env.GITHUB_APP_CLIENT_SECRET,
  },
})

/**
 * @todo: we should generate a custom JWT containing username, membership, etc
 * to avoid having to ask for it all the time.
 *
 * @todo: cache installation token locally, until it's valid.
 */
const authorize = async (context: object) => {
  const userToken = get(context, 'graphqlContext.aws.event.headers.authorization')

  if (!userToken) {
    throw new Error('No authorization token provided')
  }

  try {
    const user = await userOctokit.users.getAuthenticated({
      headers: { authorization: userToken },
    })

    const membership = await appOctokit.orgs.getMembership({
      org: env.GITHUB_ORG_ID,
      username: user.data.login,
    })

    if (membership.data.state !== 'active') {
      throw new Error('Membership not found')
    }

    const { token: installationToken } = (await appOctokit.auth({ type: 'installation' })) as {
      token: string
    }

    return set(context, 'headers.authorization', `Bearer ${installationToken}`)
  } catch (err) {
    console.error(err)
    throw new Error(`Not authorized to access ${env.GITHUB_ORG_ID} repositories.`)
  }
}

export { authorize }
