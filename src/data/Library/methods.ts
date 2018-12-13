import { defaultTo, path, compose } from 'ramda'
import { Department } from '../__generated-types'
import { fetchPackages } from '../../utils/npms'
import {
  NodeLibrary,
  NodeLibrary_dependents
} from './__generated-types/NodeLibrary'
import { Omit } from 'utility-types'
import {
  RepositoriesQuery_organization_repositories_nodes,
  RepositoriesQuery_organization_repositories_nodes_object_Blob_package_dependencies
} from '../Repository/__generated-types/RepositoriesQuery'

export function fetchLibraries (
  department: Department,
  repositories: RepositoriesQuery_organization_repositories_nodes[]
) {
  if (!repositories.length) return []
  switch (department) {
    case Department.FRONTEND:
      return fetchFrontendLibraries(repositories)
    default:
      return []
  }
}

type PartialNodeLibrary = Omit<
  NodeLibrary,
  'alertedDependents' | 'outdatedDependents'
>

async function fetchFrontendLibraries (
  repositories: RepositoriesQuery_organization_repositories_nodes[]
) {
  const dependentsMap = createDependentsMap(repositories)
  const packages = await fetchPackages(Array.from(dependentsMap.keys()))
  return Object.values(packages).map<PartialNodeLibrary>(
    ({ collected: { metadata } }) => {
      const dependents = dependentsMap.get(metadata.name) || []
      return {
        id: metadata.name,
        license: metadata.license || null,
        ...metadata,
        dependents,
        totalDependents: dependents.length,
        __typename: 'NodeLibrary'
      }
    }
  )
}

type Dependencies = RepositoriesQuery_organization_repositories_nodes_object_Blob_package_dependencies[]
const extractRepositoryDependencies = compose<
RepositoriesQuery_organization_repositories_nodes,
Dependencies | undefined,
Dependencies
>(
  defaultTo([]),
  path(['object', 'package', 'dependencies'])
)

function createDependentsMap (
  repositories: RepositoriesQuery_organization_repositories_nodes[]
) {
  const map = new Map<string, NodeLibrary_dependents[]>()
  repositories.forEach(repository => {
    const dependencies = extractRepositoryDependencies(repository)
    dependencies.forEach(dependency => {
      const dependents = mapGet(map, dependency.name, [])
      dependents.push({
        __typename: 'NodeLibraryDependent',
        id: `${repository.id}:${dependency.name}`,
        name: repository.name,
        version: dependency.version
      })
    })
  })
  return map
}

function mapGet<Key, Value> (
  map: Map<Key, Value>,
  key: Key,
  initialValue: Value
) {
  const value = map.get(key)
  if (value === undefined) {
    map.set(key, initialValue)
    return initialValue
  }
  return value
}
