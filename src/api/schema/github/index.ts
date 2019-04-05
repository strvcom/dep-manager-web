import { GraphQLSchema } from 'graphql'
import { makeRemoteExecutableSchema, introspectSchema } from 'graphql-tools'

import { link } from './link'

/**
 * Creates a remote schema based on GitHub GraphQL API.
 */
const createSchema = async (): Promise<GraphQLSchema> =>
  makeRemoteExecutableSchema({
    schema: await introspectSchema(link),
    link
  })

export { createSchema }
