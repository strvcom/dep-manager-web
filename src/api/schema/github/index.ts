import { transformSchema } from 'graphql-tools'

import { schema as originalSchema } from './schema'

const schema = transformSchema(originalSchema, [])

export { schema }
