import gql from 'graphql-tag'
// import { Department, RangeInput } from './__generated-types';

export default gql`
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
    Lookup for a singleton that represents the authentication state of the client
    """
    authentication: BidaAuthentication!
    """
    Lookup a collection of library by department and range or project name
    """
    libraries(
      department: BidaDepartment!
      from: Date
      to: Date
      projectId: String
    ): BidaLibraryCollection!
    """
    Lookup a single library by it's id and department
    """
    library(id: String!, department: BidaDepartment!): BidaLibrary!
    """
    Lookup a collection of project by department
    """
    projects(department: BidaDepartment!): BidaProjectCollection!
    """
    Lookup a project by department and id
    """
    project(id: String!, department: BidaDepartment!): BidaProject!
  }

  extend type Mutation {
    """
    Changes the authentication token
    """
    changeToken(token: String!): BidaAuthentication!
  }

  """
  Client authentication state
  """
  type BidaAuthentication {
    """
    The Netlify token
    """
    token: String
  }
  type BidaLibraryCollection {
    id: String!
    department: BidaDepartment!
    from: Date
    to: Date
    projectId: String
    totalCount: Int!
    outdatedDependentsCount: Int!
    alertedDependentsCount: Int!
    nodes: [BidaLibrary!]!
  }
  # Library
  interface BidaLibrary {
    id: String!
    name: String!
    date: String!
  }

  type BidaNodeLibrary implements BidaLibrary {
    id: String!
    name: String!
    date: String!
    version: String!
    license: String
    outdatedDependentsCount: Int!
    alertedDependentsCount: Int!
    totalDependentsCount: Int!
    dependents: [BidaNodeLibraryDependent!]!
  }

  type BidaNodeLibraryDependent {
    id: String!
    name: String!
    version: String!
  }

  type BidaNodeProjectDependency {
    id: String!
    name: String!
    version: String!
    library: BidaNodeLibrary!
  }

  type BidaProjectCollection {
    id: BidaDepartment!
    totalCount: Int!
    totalArchived: Int!
    nodes: [BidaProject!]!
  }

  interface BidaProject {
    id: String!
    name: String!
    url: String!
    pushedAt: String!
    isArchived: Boolean!
  }

  type BidaNodeProject implements BidaProject {
    id: String!
    name: String!
    url: String!
    pushedAt: String!
    department: BidaDepartment!
    isArchived: Boolean!
    version: String
    outdatedLibraries: Int!
    alertedLibraries: Int!
    dependencies: [BidaNodeProjectDependency!]!
    libraries(from: Date, to: Date): BidaLibraryCollection!
  }

  type BidaIOSProject implements BidaProject {
    id: String!
    name: String!
    url: String!
    pushedAt: String!
    isArchived: Boolean!
  }

  type BidaAndroidProject implements BidaProject {
    id: String!
    name: String!
    url: String!
    pushedAt: String!
    isArchived: Boolean!
  }
`
