import { print } from 'graphql/language'
import gql from 'graphql-tag'
import { over, lensProp, mergeDeepRight } from 'ramda'

import npm from './modules/npm'
import projects from './modules/projects'

const core = {
  typeDefs: gql`
    extend type Query {
      bida: String!
    }
  `,

  resolvers: {
    Query: {
      bida: () => 'Hello, bida!'
    }
  }
}

const modules = [core, npm, projects]

interface Module {
  typeDefs: any
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
