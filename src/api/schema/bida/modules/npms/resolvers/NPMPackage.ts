import { identity, path, prop } from 'ramda'
import { combineResolvers, pipeResolvers } from 'graphql-resolvers'
import { IResolverOptions } from 'graphql-tools'

import * as loaders from '../loaders'

interface INPMPackage {
  name: string
  analysis: object
}

/**
 * Load analysis and inject into package object.
 */
const attachAnalysis = async (root: INPMPackage): Promise<INPMPackage> => {
  if (!root.name) {
    throw new Error('Cannot load package analysis without "name".')
  }

  const result = await loaders.analysis.load(root.name)

  return { ...root, analysis: result }
}

/**
 * Factory for scalar package field resolvers based on NPMS metadata.
 */
const metadata = (
  field: string,
  transform: <Value>(value: Value) => unknown = identity
): IResolverOptions => ({
  fragment: `... on NPMPackage { name }`,
  // @ts-ignore
  resolve: pipeResolvers(
    combineResolvers(
      // first, try and grab an existing value.
      prop(field),
      // then, load from NPMS analysis as a fallback.
      pipeResolvers(attachAnalysis, path(['analysis', 'collected', 'metadata', field]))
    ),
    transform
  ),
})

/**
 * NPMPackage::{meta}
 *
 * Resolves scalar meta-data based on NPMS analysis information.
 */
const license = metadata('license')
const description = metadata('description')
const _private = metadata('private', Boolean)
const updatedAt = metadata('date')
const version = metadata('version')

/**
 * Resolves package analysis based on NPMS service.
 */
const analysis = {
  fragment: `... on NPMPackage { name }`,
  resolve: pipeResolvers(attachAnalysis, prop('analysis')),
}

// @tests
export { attachAnalysis, metadata }

export const NPMPackage = {
  license,
  description,
  private: _private,
  updatedAt,
  version,
  analysis,
}
