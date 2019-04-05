import { mergeSchemas } from 'graphql-tools'

import { createSchema as createGitHubSchema } from './github'
import { createSchema as createBidaSchema } from './bida'

/**
 * Creates the joined schema based on all the project's APIs.
 */
const createSchema = async (): Promise<any> =>
  mergeSchemas({
    schemas: [await createGitHubSchema(), await createBidaSchema()]
  })

export { createSchema }
