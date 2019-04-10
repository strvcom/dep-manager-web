import { path } from 'ramda'
import * as loaders from '../loaders'

/**
 * Query::npmPackage
 *
 * Resolves an NPMPackage info based on NPMS API.
 */
const npmPackage = (root: any, { name }: any) =>
  loaders.analysis.load(name).then(path(['collected', 'metadata']))

export const Query = { npmPackage }
