import { transformSchema } from 'graphql-tools'

import { schema as originalSchema } from './schema'
import { transform as transformConnections } from './transforms/connections'

const schema = transformSchema(originalSchema, [transformConnections])

export { schema }
