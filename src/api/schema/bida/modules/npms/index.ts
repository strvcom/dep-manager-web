/**
 * This modules interconnects NPM packages with analysis
 * data from https://npms.io/.
 *
 * @see: https://api-docs.npms.io/
 */

import gql from 'graphql-tag'
import { identity, path, prop } from 'ramda'
import { combineResolvers, pipeResolvers } from 'graphql-resolvers'

import { versionDistance } from '../../../../../utils/version-diff'
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
    description: String!
    date: String!
    license: String!
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
    updatedAt: String
    private: Boolean
    description: String
    analysis: NPMSAnalysis
  }

  extend type NPMDependency {
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
    // first, try and grab an existing value.
    prop(field),
    // then, load from NPMS analysis as a fallback.
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
  updatedAt: metadata('date'),

  /**
   * Resolves package analysis based on NPMS service.
   */
  analysis: {
    fragment: `... on NPMPackage { name }`,
    resolve: pipeResolvers(attachAnalysis, prop('analysis'))
  }
}

const NPMDependency = {
  /**
   * Shortcut for analyzing a package's outdate distance.
   */
  outdateStatus: {
    fragment: `... on NPMDependency { name version }`,
    resolve: async ({ name, version }: any) => {
      const analysis = await loaders.analysis.load(name)

      return versionDistance(
        version,
        // @ts-ignore
        path(['collected', 'metadata', 'version'], analysis)
      )
    }
  }
}

const Query = {
  /**
   * Resolves an NPMPackage info based on NPMS API.
   */
  npmPackage: (root: any, { name }: any) =>
    loaders.analysis.load(name).then(path(['collected', 'metadata']))
}

const resolvers = { Query, NPMPackage, NPMDependency }

export default { typeDefs, resolvers }
