/**
 * This module holds NPM asset resolving based on GitHub blob.
 */

import gql from 'graphql-tag'
import { pathOr, pipe, propOr, toPairs, zipObj, map, omit } from 'ramda'

const typeDefs = gql`
  type NPMDependency {
    id: String!
    name: String!
    version: String!
  }

  type NPMPackage {
    id: String!
    name: String!
    version: String!
    dependencies: [NPMDependency!]!
  }

  extend type Repository {
    npmPackage: NPMPackage
  }
`

interface NPMPackage {
  id: string
  name: string
  version: string
  dependencies: NPMDependency[]
}
interface NPMDependency {
  id: string
  name: string
  version: string
}

const NPMPackage = {
  id: ({ id, name }: NPMPackage): string => {
    if (!id && !name) {
      throw new Error('NPMPackage::id must resolve to a valid value.')
    }

    return id || name
  },

  dependencies: pipe<NPMPackage, NPMDependency[], [string, NPMDependency][], unknown>(
    propOr({}, 'dependencies'),
    toPairs,
    map(zipObj(['name', 'version']))
  ),
}

const NPMDependency = {
  id: ({ name, version }: NPMPackage) => {
    if (!name) {
      throw new Error('NPMDependency::id must have a name available.')
    }

    if (!version) {
      throw new Error('NPMDependency::id must have a version available.')
    }

    return `${name}@${version}`
  },

  // @TODO: deprecated?
  package: omit(['version']),
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
    resolve: pipe<object, string | null, NPMPackage>(
      pathOr(null, ['npmPackageJSON', 'text']),
      str => str && JSON.parse(str)
    ),
  },
}

const resolvers = { NPMPackage, NPMDependency, Repository }

export default { typeDefs, resolvers }
