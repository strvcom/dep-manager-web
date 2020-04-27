import { identity } from 'ramda'
import { get } from 'lodash'
import { pipeResolvers } from 'graphql-resolvers'
import * as GT from '~generated/types'
import * as loaders from '../loaders'

/**
 * Load analysis and inject into package object.
 */
const attachAnalysis = async (root: GT.NpmPackage): Promise<GT.NpmPackage> => {
  if (!root.name) {
    throw new Error('Cannot load package analysis without "name".')
  }

  return { ...root, analysis: await loaders.analysis.load(root.name) }
}

/**
 * Factory for scalar package field resolvers based on NPMS metadata.
 */
const metadata = <T extends (input: any) => any>(field: string, transform?: T) => ({
  fragment: '... on NPMPackage { name }',
  resolve: async (parent: GT.NpmPackage) =>
    (transform || identity)(
      field in parent
        ? parent[field]
        : get(await attachAnalysis(parent), `analysis.collected.metadata.${field}`)
    ),
})

// @tests
export { attachAnalysis, metadata }

const NPMPackage: GT.NpmPackageResolvers = {
  license: metadata('license'),
  description: metadata('description'),
  private: metadata('private', Boolean),
  updatedAt: metadata('date'),
  version: metadata('version'),

  /**
   * Resolves package analysis based on NPMS service.
   */
  analysis: {
    fragment: `... on NPMPackage { name }`,
    resolve: pipeResolvers(attachAnalysis, ({ analysis }) => analysis),
  },
}

export { NPMPackage }
