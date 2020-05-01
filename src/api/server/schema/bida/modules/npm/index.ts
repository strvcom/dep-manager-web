/**
 * This module holds NPM asset resolving based on GitHub blob.
 */

import { pipe, propOr, toPairs, zipObj, map, omit } from 'ramda'
import * as GT from '~generated/types'
import typeDefs from './npm.graphql'

const NPMPackage: GT.NPMPackageResolvers = {
  id: ({ id, name }): string => {
    if (!id && !name) {
      throw new Error('NPMPackage::id must resolve to a valid value.')
    }

    return id || name
  },

  dependencies: pipe<GT.NPMPackage, GT.NPMDependency[], [string, GT.NPMDependency][], any>(
    propOr({}, 'dependencies'),
    toPairs,
    map(zipObj(['name', 'version']))
  ),
}

const NPMDependency: GT.NPMDependencyResolvers = {
  id: ({ name, version }) => {
    if (!name) {
      throw new Error('NPMDependency::id must have a name available.')
    }

    if (!version) {
      throw new Error('NPMDependency::id must have a version available.')
    }

    return `${name}@${version}`
  },

  // @TODO: deprecated?
  package: omit(['version', '__typename']),
}

const Repository: GT.RepositoryResolvers = {
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
    resolve: ({ npmPackageJSON }) =>
      npmPackageJSON?.text ? JSON.parse(npmPackageJSON?.text) : null,
  },
}

const resolvers = { NPMPackage, NPMDependency, Repository }

export default { typeDefs, resolvers }
