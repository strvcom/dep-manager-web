import { print } from 'graphql/language'
import { over, lensProp, mergeDeepRight } from 'ramda'

import npm from './modules/npm'
import projects from './modules/projects'

const modules = [npm, projects]

interface Module {
  typeDefs: string
  resolvers: object
}

const combineModules = (combining: Module[]) =>
  combining.map(over(lensProp('typeDefs'), print)).reduce((acc, next) => ({
    typeDefs: `${acc.typeDefs}\n${next.typeDefs}`,
    resolvers: mergeDeepRight(acc.resolvers, next.resolvers)
  }))

// we keep this promise based signature for future possibilities of
// actual deep schema merging and isolation (namespaces).
const createSchema = async (): Promise<any> => combineModules(modules)

export { createSchema }
