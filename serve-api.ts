/**
 * This script serves the API locally for isolated development purposes. It's
 * not fit for production, and issues such as performance should probably
 * not be addressed here.
 */

import { ApolloServer } from 'apollo-server'

import { createSchema } from './src/api/schema/github'

createSchema()
  .then(schema => {
    const server = new ApolloServer({ schema })

    return server.listen().then(({ url }) => {
      console.log(`API ready at ${url}`)
    })
  })
  .catch(err => {
    console.error(err)
    process.exit()
  })
