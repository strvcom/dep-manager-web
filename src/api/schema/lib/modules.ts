import { mergeDeepRight } from 'ramda'
import { IResolvers } from 'graphql-tools'

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
