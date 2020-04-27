import { DeepNonNullable } from 'utility-types'
import { GraphQLResolveInfo } from 'graphql'
import { APIGatewayEvent, Context as AWSContext } from 'aws-lambda'
import * as GT from '~generated/types'

export interface ResolverContextType {
  aws: {
    event: APIGatewayEvent
    context: AWSContext
  }
}

type Type = { __typename: keyof GT.ResolversParentTypes }

/**
 * Extend parent types for our system logic on extra props.
 *
 * - "Dependent" receives __parent field.
 */
type ParentMapper<T> = T extends Type
  ? T['__typename'] extends 'Dependent'
    ? T & { __parent: { name: string, version: string } }
    : T['__typename'] extends 'Repository'
    ? T & { npmPackageJSON?: GT.Blob }
    : T
  : T

/**
 * Custom resolver signature to customize types.
 *
 * - Adjust parent to have non-null properties;
 */
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: ParentMapper<DeepNonNullable<TParent>>,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult
