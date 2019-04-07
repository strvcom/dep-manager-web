import gql from 'graphql-tag'

const typeDefs = gql`
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
`

const Repository = {
  /**
   * Resolves the package.json data of a repository, using GitHub "object" API.
   */
  npmPackage: {
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
}

const resolvers = { Repository }

export default { typeDefs, resolvers }
