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
    projects(department: BidaDepartment!): SearchResultItemConnection!
    """
    Lookup a project by department and id
    """
    project(id: String!): Repository!
  }
`

const resolvers = {}

export default { typeDefs, resolvers }
