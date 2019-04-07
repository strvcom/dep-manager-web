import { print } from 'graphql/language'
import { IResolvers } from 'graphql-tools'
import { over, lensProp, mergeDeepRight } from 'ramda'

import npm from './modules/npm'
import npms from './modules/npms'
import projects from './modules/projects'

interface Module {
  typeDefs: any // AST
  resolvers: IResolvers
}

const modules: Module[] = [npm, npms, projects]

/**
 * Combines two GraphQL modules (typeDefs + resolvers) into one.
 */
const combine = (left: Module, right: Module): Module => ({
  // combine typeDefs strings into one.
  typeDefs: `${left.typeDefs}\n${right.typeDefs}`,
  // combine resolvers into one.
  resolvers: mergeDeepRight(left.resolvers, right.resolvers)
})

const schema = modules
  // extract typeDefs text, AST is not compatible
  .map(over(lensProp('typeDefs'), print))
  .reduce(combine)

export { schema }
