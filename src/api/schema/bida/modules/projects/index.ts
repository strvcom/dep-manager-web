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

  extend type Query {
    """
    Lookup a collection of project by department
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

const resolvers = {
  Query: { projects }
}

export default { typeDefs, resolvers }
