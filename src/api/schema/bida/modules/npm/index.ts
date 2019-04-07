/**
 * This module holds NPM asset resolving based on GitHub blob.
 */

import gql from 'graphql-tag'
import { path, pipe, propOr, toPairs, zipObj, map, identity, when } from 'ramda'

const typeDefs = gql`
  type NPMDependency {
    id: String!
    package: NPMPackage!
  }

  type NPMPackage {
    id: String!
    name: String!
    version: String
    private: Boolean
    description: String
    dependencies: [NPMDependency]!
  }

  extend type Repository {
    npmPackage: NPMPackage
  }
`

const packageIDResolver = ({ id, name, version }: any) =>
  id || `${name}@${version}`

const NPMPackage = {
  id: packageIDResolver,
  dependencies: pipe(
    propOr({}, 'dependencies'),
    // @ts-ignore
    toPairs,
    map(zipObj(['name', 'version']))
  )
}

const NPMDependency = {
  id: packageIDResolver,
  package: identity
}

const Repository = {
  /**
   * Resolves the package.json data of a repository, using GitHub "object" API.
   */
  npmPackage: {
    fragment: `
      ... on Repository {
        npmPackageJSON: object(expression: "HEAD:package.json") {
          ... on Blob {
            text
          }
        }
      }
    `,
    resolve: pipe(
      // @ts-ignore
      path(['npmPackageJSON', 'text']),
      // @ts-ignore
      when(Boolean, JSON.parse)
    )
  }
}

const resolvers = { NPMPackage, NPMDependency, Repository }

export default { typeDefs, resolvers }
