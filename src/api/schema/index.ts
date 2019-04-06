import { mergeSchemas } from 'graphql-tools'

import { createSchema as createGitHubSchema } from './github'
import { createSchema as createBidaSchema } from './bida'

/**
 * Creates the joined schema based on all the project's APIs.
 */
const createSchema = async (): Promise<any> => {
  const gitHubSchema = await createGitHubSchema()
  const { typeDefs, resolvers } = await createBidaSchema()

  return mergeSchemas({ schemas: [gitHubSchema, typeDefs], resolvers })
}

export { createSchema }
