import { wrapSchema } from 'graphql-tools'

import { schema as originalSchema } from './schema'
import { transforms as transformConnections } from './transforms/connections'

const schema = wrapSchema(originalSchema, [...transformConnections])

export { schema }
