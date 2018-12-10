declare module 'graphql-anywhere/lib/async' {
  import { Resolver, VariableMap, ExecOptions } from 'graphql-anywhere'
  import { DocumentNode } from 'graphql'
  type AsyncGraphql = (
    resolver: Resolver,
    document: DocumentNode,
    rootValue?: any,
    contextValue?: any,
    variableValues?: VariableMap,
    execOptions: ExecOptions = {}
  ) => Promise<any>

  const graphql: AsyncGraphql
  export { graphql }
}
