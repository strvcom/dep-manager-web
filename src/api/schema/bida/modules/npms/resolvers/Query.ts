import { path } from 'ramda'
import * as loaders from '../loaders'

/**
 * Query::npmPackage
 *
 * Resolves an NPMPackage info based on NPMS API.
 */
const npmPackage = (root: null, { name }: { name: string }): object =>
  loaders.analysis.load(name).then(path(['collected', 'metadata']))

export const Query = { npmPackage }
