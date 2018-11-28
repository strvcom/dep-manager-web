import defaultTo from 'ramda/es/defaultTo'
import path from 'ramda/es/path'
import compose from 'ramda/es/compose'
import { Department } from '../__generated-types'
import {
  Repositories_nodes,
  Repositories_nodes_object_Blob_package_dependencies
} from '../Repository/__generated-types/Repositories'
import { fetchPackages } from '../../utils/npms'
import {
  NodeLibrary,
  NodeLibrary_dependents
} from './__generated-types/NodeLibrary'

export function fetchLibraries (
  department: Department,
  repositories: Repositories_nodes[]
) {
  switch (department) {
    case Department.FRONTEND:
      return fetchFrontendLibraries(repositories)
    default:
      return []
  }
}

async function fetchFrontendLibraries (repositories: Repositories_nodes[]) {
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

type Dependencies = Repositories_nodes_object_Blob_package_dependencies[]
const extractRepositoryDependencies = compose<
Repositories_nodes,
Dependencies | undefined,
Dependencies
>(
  defaultTo([]),
  path(['object', 'package', 'dependencies'])
)

function createDependentsMap (repositories: Repositories_nodes[]) {
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
