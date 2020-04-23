import { path } from 'ramda'
import { IResolverOptions } from 'graphql-tools'

import { versionDistance } from '~app/utils/version-diff'
import * as loaders from '../loaders'

interface NPMDependency {
  name: string
  version: string
}

/**
 * NPMDependency::outdateStatus
 *
 * Shortcut resolver for analyzing a package's outdate distance.
 */
const outdateStatus: IResolverOptions<NPMDependency> = {
  fragment: `... on NPMDependency { name version }`,
  resolve: async ({ name, version }): Promise<string> =>
    versionDistance(version, path(
      ['collected', 'metadata', 'version'],
      await loaders.analysis.load(name)
    ) as string),
}

export const NPMDependency = { outdateStatus }
