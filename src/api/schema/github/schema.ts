import { buildClientSchema } from 'graphql'
import { makeRemoteExecutableSchema } from 'graphql-tools'
import { schema as gitHubSchema } from '@octokit/graphql-schema'

import { link } from './link'

// type forcing

/**
 * Creates a remote schema based on GitHub GraphQL API.
 */
const schema = makeRemoteExecutableSchema({
  schema: buildClientSchema(gitHubSchema.json),
  link,
})

export { schema }
