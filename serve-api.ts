/**
 * This script serves the API locally for isolated development purposes. It's
 * not fit for production, and issues such as performance should probably
 * not be addressed here.
 */

import { ApolloServer } from 'apollo-server'
import { schema } from './src/api/schema'

const running = ({ url }: { url: string }) => console.log(`API ready at ${url}`)

new ApolloServer({ schema }).listen().then(running)
