/**
 * This modules interconnects NPM packages with analysis
 * data from https://npms.io/.
 *
 * @see: https://api-docs.npms.io/
 */

import gql from 'graphql-tag'
import fetch from 'isomorphic-fetch'

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
    analisys: NPMSAnalysis
  }
`

const NPMPackage = {
  analisys: async ({ name }: any) => {
    const response = await fetch('https://api.npms.io/v2/package/mget', {
      method: 'POST',
      body: JSON.stringify([name]),
      headers: { 'Content-Type': 'application/json' }
    })

    if (!response.ok) throw new Error(response.status.toString())

    const analisys = await response.json()

    return analisys[name]
  }
}

const resolvers = { NPMPackage }

export default { typeDefs, resolvers }
