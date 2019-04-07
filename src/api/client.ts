import { ApolloClient } from 'apollo-client'
import { SchemaLink } from 'apollo-link-schema'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { schema } from './schema'

const createClient = async () => {
  // pass apollo-client context forward to schema link.
  const context = (operation: any) => operation.getContext()

  const cache = new InMemoryCache()
  const link = new SchemaLink({ schema, context })

  return new ApolloClient({ cache, link })
}

export { createClient }
