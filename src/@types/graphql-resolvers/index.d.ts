declare module 'graphql-resolvers' {
  import { ResolverFn } from '~api/server/types'

  export const skip: undefined

  export interface TArgs {
    [argument: string]: any
  }

  export function combineResolvers<TSource = any, TContext = any>(
    ...resolvers: Array<ResolverFn<any, TSource, TContext, TArgs>>
  ): ResolverFn<any, TSource, TContext, TArgs>

  export function pipeResolvers<TSource = any, TContext = any>(
    ...resolvers: Array<ResolverFn<any, TSource, TContext, TArgs>>
  ): ResolverFn<any, TSource, TContext, TArgs>

  export function allResolvers<TSource = any, TContext = any>(
    resolvers: Array<ResolverFn<any, TSource, TContext, TArgs>>
  ): ResolverFn<any, TSource, TContext, TArgs>

  export function resolveDependee(dependeeName: string): ResolverFn<any, any, any, TArgs>

  export function resolveDependees(dependeeNames: string[]): ResolverFn<any, any, any, TArgs>

  export function isDependee<TSource = any, TContext = any>(
    resolver: ResolverFn<any, TSource, TContext, TArgs>
  ): ResolverFn<any, TSource, TContext, TArgs>
}
