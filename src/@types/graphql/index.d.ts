import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { Transform, IGraphQLToolsResolveInfo } from 'graphql-tools'

declare module 'graphql/type/definition' {
  interface GraphQLResolveInfo {
    mergeInfo: {
      delegateToSchema<Result = unknown>(options: {
        schema: GraphQLSchema
        operation: 'query' | 'mutation' | 'subscription'
        fieldName: string
        args?: unknown
        context: unknown
        info: IGraphQLToolsResolveInfo
        transforms?: Array<Transform>
      }): Promise<Result>
    }
  }
}
