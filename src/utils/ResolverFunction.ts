import { InMemoryCache } from 'apollo-cache-inmemory'

export type ResolverFunction <
Variables extends {} = {} ,
Response = null | Promise < any >
> = (
  obj: any,
  variables: Variables,
  context: { cache: InMemoryCache }
) => Response
