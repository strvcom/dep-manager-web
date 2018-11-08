import { InMemoryCache } from 'apollo-cache-inmemory'

type MutationFunction < Variables = any > = (
  obj: any,
  variables: Variables,
  context: { cache: InMemoryCache }
) => null
export default MutationFunction
