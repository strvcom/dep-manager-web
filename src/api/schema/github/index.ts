import { GraphQLSchema, buildClientSchema } from 'graphql'
import { makeRemoteExecutableSchema } from 'graphql-tools'

import introspection from './introspection.json'

import { link } from './link'

// type forcing
const schema: any = introspection

/**
 * Creates a remote schema based on GitHub GraphQL API.
 */
const createSchema = async (): Promise<GraphQLSchema> =>
  makeRemoteExecutableSchema({
    schema: buildClientSchema(schema),
    link
  })

export { createSchema }
