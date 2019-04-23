import { mergeDeepRight } from 'ramda'

interface DependedentResolver {
  fragment: string
  resolve: (...args: any[]) => any
}

type Resolver = (...args: any[]) => any

// IResolvers not working
interface Resolvers {
  [type: string]: {
    [field: string]: DependedentResolver | Resolver
  }
}

export interface Module {
  typeDefs?: string // printed AST
  resolvers?: Resolvers
}

/**
 * Combines two GraphQL modules (typeDefs + resolvers) into one.
 */
const combine = (left: Module, right: Module): Module => ({
  // combine typeDefs strings into one.
  typeDefs: `${left.typeDefs || ''}\n${right.typeDefs || ''}`,
  // combine resolvers into one.
  resolvers: mergeDeepRight(left.resolvers || {}, right.resolvers || {})
})

export { combine }
