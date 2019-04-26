import { mergeSchemas } from 'graphql-tools'

import { schema as gitHubSchema } from './github'
import { schema as bidaSchema } from './bida'

const { typeDefs, resolvers } = bidaSchema

const schema = mergeSchemas({
  schemas: [gitHubSchema, typeDefs || ''],
  resolvers,
})

export { schema }
