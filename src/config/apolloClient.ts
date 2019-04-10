import { ApolloClient } from 'apollo-client'

import link, { cache } from './link'
import typeDefs from '../data/typeDefs'

const client = new ApolloClient({ link, cache, typeDefs })

export default client
