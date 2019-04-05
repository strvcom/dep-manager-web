import { GraphQLSchema } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'
import gql from 'graphql-tag'

const typeDefs = gql`
  type Query {
    bida: String!
  }
`

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    bida: () => 'Hello, bida!'
  }
}

const createSchema = async (): Promise<GraphQLSchema> =>
  makeExecutableSchema({ typeDefs, resolvers })

export { createSchema }
