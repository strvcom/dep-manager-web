import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloCache } from 'apollo-cache'

type GetCacheKeyFn = (data: { __typename: string; id: string }) => string

export type ResolverFunction <
Root extends {} = {} ,
Variables = null,
Result = any
> = (
  obj: Root,
  variables: Variables,
  context: {
  cache: ApolloCache<NormalizedCacheObject>
  getCacheKey: GetCacheKeyFn
  [key: string]: any
  }
) => Result | null

interface ResolverArguments<
  Root extends {} = {},
  Variables extends {} | null = null,
  Context = any
> {
  root: Root
  variables: Variables
  cache: ApolloCache<NormalizedCacheObject>
  getCacheKey: GetCacheKeyFn
  context: Context
}

export const createResolver = <
Root extends {} = {},
Variables extends {} | null = null,
Result = any,
Context = any
>(
  resolverFn: (
    obj: ResolverArguments<Root, Variables, Context>
  ) => Result | null
): ResolverFunction<Root, Variables, Result> => (root, variables, context) => {
  return resolverFn({
    root,
    variables,
    cache: context.cache,
    getCacheKey: context.getCacheKey,
    context: context as any
  })
}
