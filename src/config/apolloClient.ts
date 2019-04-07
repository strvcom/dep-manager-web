import { ApolloClient } from 'apollo-client'

import link, { cache } from './link'
import typeDefs from '../data/typeDefs'
import resolvers from './resolvers'

const client = new ApolloClient({ link, cache, typeDefs, resolvers })

export default client
