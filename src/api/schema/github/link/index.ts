import { ApolloLink } from 'apollo-link'

import { link as auth } from './auth'
import { link as http } from './http'

const link = ApolloLink.from([auth, http])

export { link }
