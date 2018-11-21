import { InMemoryCache } from 'apollo-cache-inmemory'

export type ResolverFunction <
Variables = null ,
Response = null | Promise < any >,
Obj = any
> = (
  obj: Obj,
  variables: Variables,
  context: { cache: InMemoryCache }
) => Response
