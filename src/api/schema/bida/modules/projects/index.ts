import gql from 'graphql-tag'

import { DEPARTMENTS } from './constants'

// "* as NAME" syntax breaks GraphQL resolvers tree.
import { projects } from './resolvers/Query'
import { departments } from './resolvers/Repository'
import { dependents } from './resolvers/NPMPackage'

const typeDefs = gql`
  """
  Enumerator that indicates types of projects this application acknowledges
  """
  enum BidaDepartment {
    ${DEPARTMENTS.join('\n')}
  }

  type Dependent {
    version: String!
    repository: Repository!
  }

  extend union SearchResultItem = Dependent

  extend type Repository {
    departments: [BidaDepartment]
  }

  extend type NPMPackage {
    dependents(
      after: String
      before: String
      first: Int
      last: Int
      archived: Boolean
      department: BidaDepartment
    ): SearchResultItemConnection
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
      archived: Boolean
      department: BidaDepartment
    ): SearchResultItemConnection!

    """
    Lookup a project by department and id
    """
    project(id: String!): Repository!
  }
`

const resolvers = {
  Query: { projects },
  Repository: { departments },
  NPMPackage: { dependents }
}

export default { typeDefs, resolvers }
