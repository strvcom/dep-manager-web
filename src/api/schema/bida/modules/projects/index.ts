import gql from 'graphql-tag'

const DEPARTMENTS = ['FRONTEND', 'BACKEND', 'ANDROID', 'IOS']

const typeDefs = gql`
  """
  Enumerator that indicates types of projects this application acknowledges
  """
  enum BidaDepartment {
    ${DEPARTMENTS.join('\n')}
  }

  extend type Repository {
    departments: [BidaDepartment]
  }

  extend type Query {
    """
    Search projects within a department
    """
    projects(
      after: String
      before: String
      first: Int
      last: Int
      department: BidaDepartment!
    ): SearchResultItemConnection

    """
    Lookup a project by department and id
    """
    project(id: String!): Repository!
  }
`

const Query = {
  /**
   * Resolves all projects of the provided department inside strvcom org.
   */
  projects: (root: any, args: any, context: any, info: any) => {
    const { department, ...search } = args
    const { schema, mergeInfo } = info

    const type = 'REPOSITORY'
    const query = `topic:${department.toLowerCase()} user:strvcom`

    return mergeInfo.delegateToSchema({
      info,
      schema,
      context,
      operation: 'query',
      fieldName: 'search',
      args: { type, query, ...search }
    })
  }
}

const Repository = {
  /**
   * Resolves the STRV departments of a repository based on present topics.
   */
  departments: {
    fragment: `
    ... on Repository {
      repositoryTopics (first: 10) {
        nodes {
          topic {
            name
          }
        }
      }
    }
  `,
    resolve: ({ repositoryTopics }: any) =>
      repositoryTopics.nodes
        .map(({ topic: { name } }: any) => name)
        .map((name: string) => name.toUpperCase())
        .filter((name: string) => DEPARTMENTS.includes(name))
  }
}

const resolvers = { Query, Repository }

export default { typeDefs, resolvers }
