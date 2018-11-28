import defaultTo from 'ramda/es/defaultTo'
import path from 'ramda/es/path'
import compose from 'ramda/es/compose'
import { Department } from '../__generated-types'
import { fetchPackages } from '../../utils/npms'
import {
  NodeLibrary,
  NodeLibrary_dependents
} from './__generated-types/NodeLibrary'
import {
  GithubRepositoriesQuery_organization_repositories_nodes,
  GithubRepositoriesQuery_organization_repositories_nodes_object_Blob_package_dependencies
} from '../Repository/__generated-types/GithubRepositoriesQuery'

export function fetchLibraries (
  department: Department,
  repositories: GithubRepositoriesQuery_organization_repositories_nodes[]
) {
  if (!repositories.length) return []
  switch (department) {
    case Department.FRONTEND:
      return fetchFrontendLibraries(repositories)
    default:
      return []
  }
}

async function fetchFrontendLibraries (
  repositories: GithubRepositoriesQuery_organization_repositories_nodes[]
) {
  const dependentsMap = createDependentsMap(repositories)
  const packages = await fetchPackages(Array.from(dependentsMap.keys()))
  return Object.values(packages).map<NodeLibrary>(
    ({ collected: { metadata } }) => ({
      id: metadata.name,
      ...metadata,
      dependents: dependentsMap.get(metadata.name) || [],
      __typename: 'NodeLibrary'
    })
  )
}

type Dependencies = GithubRepositoriesQuery_organization_repositories_nodes_object_Blob_package_dependencies[]
const extractRepositoryDependencies = compose<
GithubRepositoriesQuery_organization_repositories_nodes,
Dependencies | undefined,
Dependencies
>(
  defaultTo([]),
  path(['object', 'package', 'dependencies'])
)

function createDependentsMap (
  repositories: GithubRepositoriesQuery_organization_repositories_nodes[]
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
