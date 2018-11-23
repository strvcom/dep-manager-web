import { InMemoryCache } from 'apollo-cache-inmemory'

export type ResolverFunction < Variables = null > = (
  obj: any,
  variables: Variables,
  context: { cache: InMemoryCache }
) => any
