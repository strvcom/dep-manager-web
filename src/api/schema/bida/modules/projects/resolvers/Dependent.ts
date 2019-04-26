import { pathEq } from 'ramda'
import mem from 'mem'

import { versionDistance } from '../../../../../../utils/version-diff'
import { IDependentNode } from './NPMPackage'

const getVersion = mem(
  (lib: string, repository: any) =>
    repository.npmPackage.dependencies.find(pathEq(['package', 'name'], lib))
      .version,
  { cacheKey: (lib, repository) => `${lib}^${repository.name}` }
)

/**
 * Dependent::version
 *
 * Resolves the version a dependent depends on the parent NPMPackage.
 */
const version = ({
  __parent: { name: lib },
  repository,
}: IDependentNode): string => getVersion(lib, repository)

/**
 * Dependent::name
 *
 * Resolves the name of the dependent.
 */
const name = ({ repository }: IDependentNode): string => repository.name

/**
 * Dependent::name
 *
 * Resolves the name of the dependent.
 */
const id = ({ __parent, repository }: IDependentNode): string =>
  `${getVersion(__parent.name, repository)}@${repository.name}`

/**
 * Dependent::outdatedStatus
 *
 * Shortcut resolver for outdate status on this dependent.
 */
const outdateStatus = ({ __parent, repository }: IDependentNode): string =>
  versionDistance(
    getVersion(__parent.name, repository),
    // @ts-ignore
    __parent.version
  )

export const Dependent = { id, name, version, outdateStatus }
