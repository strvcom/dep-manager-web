/**
 * This modules interconnects NPM packages with analysis
 * data from https://npms.io/.
 *
 * @see: https://api-docs.npms.io/
 */

import gql from 'graphql-tag'
import { analysis } from './loaders'

const typeDefs = gql`
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

  # type NPMSMetadata {
  #   name: String!
  #   version: String!
  #   description: String!
  #   date: String!
  #   scope: String
  #   license: String!
  #   keywords: String[]
  #   publisher: NPMSUser
  #   maintainers: NPMSUser[]
  #   repository: NPMSRepository
  #   links: NPMSLinks
  #   dependencies: NPMDependency
  #   releases: Release[]
  # }

  # type NPMSCollected {
  #   metadata: NPMSMetadata!
  # }

  type NPMSAnalysis {
    id: String!
    analyzedAt: String!
    # collected: NPMSCollected
    # evaluation: NPMSEvaluation!
    # score: NPMSScore!
  }

  extend type NPMPackage {
    analysis: NPMSAnalysis
  }
`

const NPMPackage = {
  analysis: ({ name }: any) => analysis.load(name)
}

const resolvers = { NPMPackage }

export default { typeDefs, resolvers }
