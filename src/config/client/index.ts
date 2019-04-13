import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { link } from './link'

const cache = new InMemoryCache()
const client = new ApolloClient({ cache, link })

export { client }
