import { print } from 'graphql/language'
import { over, lensProp, mergeDeepRight } from 'ramda'

import npm from './modules/npm'
import projects from './modules/projects'

const modules = [npm, projects]

const schema = modules.map(over(lensProp('typeDefs'), print)).reduce(
  (acc, next): any => ({
    typeDefs: `${acc.typeDefs}\n${next.typeDefs}`,
    resolvers: mergeDeepRight(acc.resolvers, next.resolvers)
  })
)

export { schema }
