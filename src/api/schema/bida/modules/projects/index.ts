import gql from 'graphql-tag'

const typeDefs = gql`
  """
  Enumerator that indicates types of projects this application acknowledges
  """
  enum BidaDepartment {
    FRONTEND
    BACKEND
    ANDROID
    IOS
  }

  type NPMPackage {
    id: String!
    name: String!
    version: String
    private: Boolean
    description: String
  }

  extend type Repository {
    npmPackage: NPMPackage
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

/**
 * Resolves all projects of the provided department inside strvcom org.
 */
const projects = (root: any, args: any, context: any, info: any) => {
  const { department, ...search } = args
  const { schema, mergeInfo } = info

  return mergeInfo.delegateToSchema({
    info,
    schema,
    context,
    operation: 'query',
    fieldName: 'search',
    args: {
      type: 'REPOSITORY',
      query: `topic:${department.toLowerCase()} user:strvcom`,
      ...search
    }
  })
}

const npmPackage = {
  fragment: `
    ... on Repository {
      npmPackageJSON: object(expression: "HEAD:package.json") {
        ... on Blob {
          id
          text
        }
      }
    }
  `,
  resolve: ({ npmPackageJSON }: any) =>
    npmPackageJSON && npmPackageJSON.text
      ? { id: npmPackageJSON.id, ...JSON.parse(npmPackageJSON.text) }
      : null
}

const resolvers = {
  Query: { projects },
  Repository: { npmPackage }
}

export default { typeDefs, resolvers }
