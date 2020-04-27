import { mergeSchemas, IResolversParameter } from 'graphql-tools'

import { schema as gitHubSchema } from './github'
import { schema as bidaSchema } from './bida'

const { typeDefs, resolvers } = bidaSchema

const schema = mergeSchemas({
  schemas: [gitHubSchema, typeDefs || ''],
  resolvers: resolvers as IResolversParameter,
})

export { schema }
