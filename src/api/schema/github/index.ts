import { buildClientSchema } from 'graphql'
import { makeRemoteExecutableSchema } from 'graphql-tools'

import introspection from './introspection.json'

import { link } from './link'

// type forcing
const introspectedSchema: any = introspection

/**
 * Creates a remote schema based on GitHub GraphQL API.
 */
const schema = makeRemoteExecutableSchema({
  schema: buildClientSchema(introspectedSchema),
  link
})

export { schema }
