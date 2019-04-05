import { GraphQLSchema } from 'graphql'
import gql from 'graphql-tag'
import { bundle } from 'graphql-modules-fn'

const core = {
  typeDefs: gql`
    type Query {
      bida: String!
    }
  `,

  resolvers: {
    Query: {
      bida: () => 'Hello, bida!'
    }
  }
}

const modules = [core]

interface BundledSchema {
  schema: GraphQLSchema
  context: () => any
}

const createSchema = async (): Promise<GraphQLSchema> => {
  const { schema } = (await bundle(modules)) as BundledSchema

  return schema
}

export { createSchema }
