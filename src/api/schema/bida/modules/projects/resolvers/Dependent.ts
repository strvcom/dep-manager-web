import { pathEq } from 'ramda'
import mem from 'mem'

import { versionDistance } from '~app/utils/version-diff'
import * as GT from '~generated/types'

const getVersion = mem(
  (lib: string, repository: GT.Repository) =>
    repository.npmPackage?.dependencies.find(pathEq(['package', 'name'], lib))?.version || '',

  { cacheKey: (lib, repository) => `${lib}^${repository.name}` }
)

// @tests
export { getVersion }

const Dependent: GT.DependentResolvers = {
  /**
   * Resolves the version a dependent depends on the parent NPMPackage.
   */
  version: ({ __parent: { name: lib }, repository }) => getVersion(lib, repository),

  /**
   * Resolves the name of the dependent.
   */
  name: ({ repository }) => repository.name,

  /**
   * Resolves the name of the dependent.
   */
  id: ({ __parent, repository }) => `${getVersion(__parent.name, repository)}@${repository.name}`,

  /**
   * Shortcut resolver for outdate status on this dependent.
   */
  outdateStatus: ({ __parent: { name, version }, repository }) =>
    versionDistance(getVersion(name, repository), version),
}

export { Dependent }
