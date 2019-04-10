import { path } from 'ramda'

import { versionDistance } from '../../../../../../utils/version-diff'
import * as loaders from '../loaders'

/**
 * NPMDependency::outdateStatus
 *
 * Shortcut resolver for analyzing a package's outdate distance.
 */
const outdateStatus = {
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

export const NPMDependency = { outdateStatus }
