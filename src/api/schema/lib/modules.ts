import { mergeDeepRight } from 'ramda'

type Resolver = (...args: any[]) => any

interface IDependedentResolver {
  fragment: string
  resolve: Resolver
}

// IResolvers not working
interface IResolvers {
  [type: string]: {
    [field: string]: IDependedentResolver | Resolver
  }
}

export interface IGraphQLModule {
  typeDefs?: string // printed AST
  resolvers?: IResolvers
}

/**
 * Combines two GraphQL modules (typeDefs + resolvers) into one.
 */
const combine = (
  left: IGraphQLModule,
  right: IGraphQLModule
): IGraphQLModule => ({
  // combine typeDefs strings into one.
  typeDefs: `${left.typeDefs || ''}\n${right.typeDefs || ''}`,
  // combine resolvers into one.
  resolvers: mergeDeepRight(left.resolvers || {}, right.resolvers || {}),
})

export { combine }
