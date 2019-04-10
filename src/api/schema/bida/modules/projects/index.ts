import gql from 'graphql-tag'

import { DEPARTMENTS } from './constants'

// "* as NAME" syntax breaks GraphQL resolvers tree.
import { Query } from './resolvers/Query'
import { Repository } from './resolvers/Repository'
import { NPMPackage } from './resolvers/NPMPackage'
import { Dependent } from './resolvers/Dependent'

const typeDefs = gql`
  """
  Enumerator that indicates types of projects this application acknowledges
  """
  enum BidaDepartment {
    ${DEPARTMENTS.join('\n')}
  }

  type Dependent {
    id: String!
    name: String!
    version: String!
    outdateStatus: SemverOutdateStatus!
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
    Lookup a project by name
    """
    project(name: String!): Repository!
  }
`

const resolvers = {
  Query,
  Repository,
  NPMPackage,
  Dependent
}

export default { typeDefs, resolvers }
