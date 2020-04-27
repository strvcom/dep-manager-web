import { path } from 'ramda'
import * as GT from '~generated/types'
import { versionDistance } from '~app/utils/version-diff'
import * as loaders from '../loaders'

const NPMDependency: GT.NpmDependencyResolvers = {
  /**
   * Shortcut resolver for analyzing a package's outdate distance.
   */
  outdateStatus: {
    fragment: `... on NPMDependency { name version }`,
    resolve: async ({ name, version }) =>
      versionDistance(
        version,
        path(['collected', 'metadata', 'version'], await loaders.analysis.load(name)) as string
      ),
  },
}

export { NPMDependency }
