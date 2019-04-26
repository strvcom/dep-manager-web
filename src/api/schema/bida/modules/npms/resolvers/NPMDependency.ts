import { path } from 'ramda'

import { versionDistance } from '../../../../../../utils/version-diff'
import * as loaders from '../loaders'

interface INPMDependency {
  name: string
  version: string
}

/**
 * NPMDependency::outdateStatus
 *
 * Shortcut resolver for analyzing a package's outdate distance.
 */
const outdateStatus = {
  fragment: `... on NPMDependency { name version }`,
  resolve: async ({ name, version }: INPMDependency): Promise<string> =>
    versionDistance(
      version,
      // @ts-ignore
      path(
        ['collected', 'metadata', 'version'],
        await loaders.analysis.load(name)
      )
    ),
}

export const NPMDependency = { outdateStatus }
