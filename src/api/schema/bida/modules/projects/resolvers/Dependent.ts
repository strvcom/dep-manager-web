import { pathEq } from 'ramda'
import mem from 'mem'

const getVersion = mem(
  (lib: string, repository: any) =>
    repository.npmPackage.dependencies.find(pathEq(['package', 'name'], lib))
      .version,
  { cacheKey: (lib, repository) => `${lib}^${repository.name}` }
)

/**
 * Dependent::version
 *
 * Resolves version a dependent depends on the parent NPMPackage.
 */
const version = ({ __parent: { name: lib }, repository }: any) =>
  getVersion(lib, repository)

/**
 * Dependent::name
 *
 * Resolves the name of the dependent.
 */
const name = ({ repository }: any) => repository.name

/**
 * Dependent::name
 *
 * Resolves the name of the dependent.
 */
const id = ({ __parent, repository }: any) =>
  `${getVersion(__parent.name, repository)}@${repository.name}`

export const Dependent = { id, name, version }
