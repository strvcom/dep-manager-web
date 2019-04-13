import { ApolloLink } from 'apollo-link'

import { link as auth } from './auth'
import { link as http } from './http'
import { link as debug } from './debug'

const link = ApolloLink.from([debug, auth, http])

export { link }
