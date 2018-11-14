import { InMemoryCache } from 'apollo-cache-inmemory'

export type ResolverFunction < Variables extends {} = {} , Obj = any > = (
  obj: Obj,
  variables: Variables,
  context: { cache: InMemoryCache }
) => null
