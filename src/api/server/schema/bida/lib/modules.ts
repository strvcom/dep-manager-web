import { NonNilProps } from 'tsdef'
import { mergeDeepRight } from 'ramda'
import { print, ASTNode } from 'graphql/language'
import { Resolvers } from '~generated/types'
import { ResolverContextType } from '~api/server/types'

export interface IGraphQLModule {
  typeDefs?: string // printed AST
  resolvers?: Resolvers<ResolverContextType>
}

export type SchemaDefinition = NonNilProps<IGraphQLModule>

const stringify = (typeDefs: string | ASTNode = '') =>
  typeof typeDefs === 'string' ? typeDefs : print(typeDefs)

/**
 * Combines two GraphQL modules (typeDefs + resolvers) into one.
 */
const combine = (left: IGraphQLModule, right: IGraphQLModule) => ({
  // combine typeDefs strings into one.
  typeDefs: `${stringify(left.typeDefs)} \n ${stringify(right.typeDefs)}`,
  // combine resolvers into one.
  resolvers: mergeDeepRight(left.resolvers || {}, right.resolvers || {}),
})

export { combine }
