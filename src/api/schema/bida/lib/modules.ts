import { mergeDeepRight } from 'ramda'
import { IResolvers } from 'graphql-tools'
import { print, ASTNode } from 'graphql/language'
// import { IResolverObject } from 'apollo-server-lambda'

export interface IGraphQLModule {
  typeDefs?: string // printed AST
  resolvers?: IResolvers
}

const stringify = (typeDefs: string | ASTNode = '') =>
  typeof typeDefs === 'string' ? typeDefs : print(typeDefs)

/**
 * Combines two GraphQL modules (typeDefs + resolvers) into one.
 */
const combine = (left: IGraphQLModule, right: IGraphQLModule): IGraphQLModule => ({
  // combine typeDefs strings into one.
  typeDefs: `${stringify(left.typeDefs)} \n ${stringify(right.typeDefs)}`,
  // combine resolvers into one.
  resolvers: mergeDeepRight(left.resolvers || {}, right.resolvers || {}),
})

export { combine }
