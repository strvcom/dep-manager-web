import { ApolloLink } from 'apollo-link'
import { DedupLink } from 'apollo-link-dedup'

import { link as auth } from './auth'
import { link as memo } from './memo'
import { link as http } from './http'
import { link as debug } from './debug'

const dedup = new DedupLink()

const link = ApolloLink.from([dedup, auth, memo, debug, http])

export { link }
