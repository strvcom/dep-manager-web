/**
 * This script serves the API locally for isolated development purposes. It's
 * not fit for production, and issues such as performance should probably
 * not be addressed here.
 */

import { ApolloServer } from 'apollo-server'
import { schema } from './src/api/schema'

const running = ({ url }: { url: string }) => console.log(`API ready at ${url}`)

/**
 * Fixed authorization method, used only for local development of the API.
 * On the application itself, authentication is managed using Netlify auth
 * providers with a local storing of tokens.
 */
if (!process.env.GITHUB_OAUTH_TOKEN) {
  throw new Error(
    `You must define GITHUB_OAUTH_TOKEN env in order to start the dedicated API`
  )
}

const config = {
  schema,
  context: { token: process.env.GITHUB_OAUTH_TOKEN },
  engine: { apiKey: process.env.ENGINE_API_KEY }
}

new ApolloServer(config).listen().then(running)
