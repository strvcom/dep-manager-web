import { InMemoryCache } from "apollo-cache-inmemory";

export default interface MutationFunction<Variables = any> {
  (obj: any, variables: Variables, context: {cache: InMemoryCache}): null
}
