declare module '@octokit/graphql-schema' {
  import { IntrospectionQuery } from 'graphql'

  export const schema: {
    json: IntrospectionQuery
  }
}
