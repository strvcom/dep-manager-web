import { path } from 'ramda'
import * as GT from '~generated/types'
import * as loaders from '../loaders'

const Query: GT.QueryResolvers = {
  /**
   * Resolves an NPMPackage info based on NPMS API.
   */
  npmPackage: (root, { name }): object =>
    loaders.analysis.load(name).then(path(['collected', 'metadata'])),
}

export { Query }
