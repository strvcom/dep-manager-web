import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloCache } from 'apollo-cache'
import ApolloClient from 'apollo-client'

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

export type Initializer = (client: ApolloClient<NormalizedCacheObject>) => any

export type Initializers =
  | Record<any, Initializer>
  | Array<Record<any, Initializer>>

const firedInitializers = new Set<string>()

export async function runInitializers (initializers: Initializers) {
  const { default: client } = await import('../config/apolloClient')
  for (const record of normalize(initializers)) {
    await Promise.all(
      Object.entries(record)
        .filter(([key]) => !firedInitializers.has(key))
        .map(async ([key, initializer]) => {
          const result = await initializer(client)
          if (result !== null) {
            client.cache.writeData({
              data: { [key]: result }
            })
          }
          firedInitializers.add(key)
        })
    )
  }
}

const normalize = (initializers: Initializers) =>
  Array.isArray(initializers) ? initializers : [initializers]
