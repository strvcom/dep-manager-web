/**
 * This modules interconnects NPM packages with analysis
 * data from https://npms.io/.
 *
 * @see: https://api-docs.npms.io/
 */

import gql from 'graphql-tag'
import { identity, path, prop } from 'ramda'
import semver, { SemVer } from 'semver'
import { combineResolvers, pipeResolvers } from 'graphql-resolvers'

import * as loaders from './loaders'

const OUTDATE_STATUS = [
  'MAJOR',
  'PREMAJOR',
  'MINOR',
  'PREMINOR',
  'PATCH',
  'PREPATCH',
  'PRERELEASE',
  'UNKNOWN',
  'UPTODATE'
]

const typeDefs = gql`
  """
  Enumerator that indicates a version distance.
  """
  enum SemverOutdateStatus {
    ${OUTDATE_STATUS.join('\n')}
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
    license: String
    private: Boolean
    description: String
    analysis: NPMSAnalysis
    outdateStatus: SemverOutdateStatus
  }

  extend type Query {
    npmPackage (name: String!): NPMPackage
  }
`

/**
 * Load analysis and inject into package object.
 */
const attachAnalysis = async (root: any) => ({
  ...root,
  analysis: await loaders.analysis.load(root.name)
})

/**
 * Factory for scalar package field resolvers based on NPMS metadata.
 */
const metadata = (field: string, transform: any = identity) => ({
  fragment: `... on NPMPackage { name }`,
  resolve: combineResolvers(
    prop(field),
    pipeResolvers(
      attachAnalysis,
      path(['analysis', 'collected', 'metadata', field]),
      transform
    )
  )
})

const NPMPackage = {
  license: metadata('license'),
  description: metadata('description'),
  private: metadata('private', Boolean),

  /**
   * Resolves package analysis based on NPMS service.
   */
  analysis: {
    fragment: `... on NPMPackage { name }`,
    resolve: pipeResolvers(attachAnalysis, prop('analysis'))
  },

  /**
   * Shortcut for analyzing a package's outdate distance.
   */
  outdateStatus: {
    fragment: `... on NPMPackage { name version }`,
    resolve: pipeResolvers(
      attachAnalysis,
      async ({ name, version, analysis }: any) => {
        const current: SemVer | null = semver.coerce(version)
        const latest: SemVer | undefined = semver.coerce(
          // @ts-ignore
          path(['collected', 'metadata', 'version'], analysis)
        )

        const diff =
          !current || !latest ? 'UNKNOWN' : semver.diff(current, latest)

        return diff ? diff.toUpperCase() : 'UPTODATE'
      }
    )
  }
}

const Query = {
  /**
   * Resolves an NPMPackage info based on NPMS API.
   */
  npmPackage: (root: any, { name }: any) =>
    loaders.analysis.load(name).then(path(['collected', 'metadata']))
}

const resolvers = { Query, NPMPackage }

export default { typeDefs, resolvers }
