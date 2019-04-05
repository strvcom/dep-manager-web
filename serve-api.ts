/**
 * This script serves the API locally for isolated development purposes. It's
 * not fit for production, and issues such as performance should probably
 * not be addressed here.
 */

import { ApolloServer, gql } from 'apollo-server'

const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'world'
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`API ready at ${url}`)
})
