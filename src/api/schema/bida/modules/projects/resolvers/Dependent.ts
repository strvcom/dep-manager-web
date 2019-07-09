import { pathEq } from 'ramda'
import mem from 'mem'

import { versionDistance } from '../../../../../../utils/version-diff'
import { DependentNode, Repository } from './NPMPackage'

const getVersion = mem(
  (lib: string, repository: Repository) => {
    const dependency = repository.npmPackage.dependencies.find(pathEq(['package', 'name'], lib))
    return dependency ? dependency.version : ''
  },
  { cacheKey: (lib, repository) => `${lib}^${repository.name}` }
)

/**
 * Dependent::version
 *
 * Resolves the version a dependent depends on the parent NPMPackage.
 */
const version = ({ __parent: { name: lib }, repository }: DependentNode): string =>
  getVersion(lib, repository)

/**
 * Dependent::name
 *
 * Resolves the name of the dependent.
 */
const name = ({ repository }: DependentNode): string => repository.name

/**
 * Dependent::name
 *
 * Resolves the name of the dependent.
 */
const id = ({ __parent, repository }: DependentNode): string =>
  `${getVersion(__parent.name, repository)}@${repository.name}`

/**
 * Dependent::outdatedStatus
 *
 * Shortcut resolver for outdate status on this dependent.
 */
const outdateStatus = ({ __parent, repository }: DependentNode): string =>
  versionDistance(getVersion(__parent.name, repository), __parent.version)

// @tests
export { getVersion }

export const Dependent = { id, name, version, outdateStatus }
