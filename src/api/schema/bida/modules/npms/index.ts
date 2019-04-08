/**
 * This modules interconnects NPM packages with analysis
 * data from https://npms.io/.
 *
 * @see: https://api-docs.npms.io/
 */

import gql from 'graphql-tag'
import { path } from 'ramda'
import semver, { SemVer } from 'semver'

import { analysis } from './loaders'

const OUTDATE_TYPES = [
  'MAJOR',
  'PREMAJOR',
  'MINOR',
  'PREMINOR',
  'PATCH',
  'PREPATCH',
  'PRERELEASE',
  'UNKNOWN'
]

const typeDefs = gql`
  """
  Enumerator that indicates a version distance.
  """
  enum SemverOutdated {
    ${OUTDATE_TYPES.join('\n')}
  }

  # type NPMSLinks {
  #   npm: String
  #   homepage: String
  #   repository: String
  #   bugs: String
  # }

  # type NPMSUser {
  #   email: String
  #   username: String
  # }

  type NPMSMetadata {
    name: String!
    version: String!
    # description: String!
    date: String!
    # license: String!
    # scope: String
    # keywords: String[]
    # publisher: NPMSUser
    # maintainers: NPMSUser[]
    # repository: NPMSRepository
    # links: NPMSLinks
    # dependencies: NPMDependency
    # releases: Release[]
  }

  type NPMSCollected {
    metadata: NPMSMetadata!
  }

  type NPMSAnalysis {
    id: String!
    analyzedAt: String!
    collected: NPMSCollected
    # evaluation: NPMSEvaluation!
    # score: NPMSScore!
  }

  extend type NPMPackage {
    analysis: NPMSAnalysis
    outdated: SemverOutdated
  }
`

const NPMPackage = {
  /**
   * Resolves package analysis based on NPMS service.
   */
  analysis: {
    fragment: `... on NPMPackage { name }`,
    resolve: ({ name }: any) => analysis.load(name)
  },

  /**
   * Shortcut for analyzing a package's outdate distance.
   */
  outdated: {
    fragment: `... on NPMPackage { name version }`,
    resolve: async ({ name, version }: any) => {
      const analysisResult = await analysis.load(name)

      const current: SemVer | null = semver.coerce(version)
      const latest: SemVer | undefined = semver.coerce(
        // @ts-ignore
        path(['collected', 'metadata', 'version'], analysisResult)
      )

      // console.log({ root, current, latest })

      const diff =
        !current || !latest ? 'UNKNOWN' : semver.diff(current, latest)

      return diff ? diff.toUpperCase() : null
    }
  }
}

const resolvers = { NPMPackage }

export default { typeDefs, resolvers }
