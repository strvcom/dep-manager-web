/**
 * This modules interconnects NPM packages with analysis
 * data from https://npms.io/.
 *
 * @see: https://api-docs.npms.io/
 */

import gql from 'graphql-tag'

import { Query } from './resolvers/Query'
import { NPMPackage } from './resolvers/NPMPackage'
import { NPMDependency } from './resolvers/NPMDependency'

const resolvers = { Query, NPMPackage, NPMDependency }

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

export default { typeDefs, resolvers }
