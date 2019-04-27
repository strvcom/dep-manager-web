import { path } from 'ramda'
import { IResolverOptions } from 'graphql-tools'

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
const outdateStatus: IResolverOptions<INPMDependency> = {
  fragment: `... on NPMDependency { name version }`,
  resolve: async ({ name, version }): Promise<string> =>
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
