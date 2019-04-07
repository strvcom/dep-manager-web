/**
 * This script serves the API locally for isolated development purposes. It's
 * not fit for production, and issues such as performance should probably
 * not be addressed here.
 */

import { ApolloServer } from 'apollo-server'
import { schema } from './src/api/schema'

const running = ({ url }: { url: string }) => console.log(`API ready at ${url}`)

const config = {
  schema,
  engine: {
    apiKey: process.env.ENGINE_API_KEY
  }
}

new ApolloServer(config).listen().then(running)
