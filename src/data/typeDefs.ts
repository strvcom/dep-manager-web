import gql from 'graphql-tag'

export default gql`
  extend type Query {
    auth: Authentication!
    libraries(department: Department!, range: RangeInput): [Library!]!
  }

  input RangeInput {
    from: Date
    to: Date
  }

  extend type Mutation {
    changeToken(token: String!): Authentication!
  }
  # Auth
  type Authentication {
    token: String
  }
  # Library
  type NodeLibrary {
    id: String!
    name: String!
    version: String!
    outdatedDependents: Int!
    alertedDependents: Int!
    dependents: [NodeLibraryDependent!]!
    date: String!
  }

  union Library = NodeLibrary

  type NodeLibraryDependent {
    id: String!
    name: String!
    version: String!
  }

  enum Department {
    FRONTEND
    BACKEND
    ANDROID
    IOS
  }
  # Repository
  extend type Blob {
    package: NodePackage
  }
  type NodePackage {
    id: String!
    name: String
    version: String
    outdatedLibraries: Int!
    alertedLibraries: Int!
    dependencies: [NodePackageDependency!]!
  }

  type NodePackageDependency {
    id: String!
    name: String!
    version: String!
    library: NodeLibrary!
  }
`
