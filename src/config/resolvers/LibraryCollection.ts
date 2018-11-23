import { ResolverFunction } from '../../utils/ResolverFunction'
import { REPOSITORIES_FRAGMENT } from '../../data/Repository'
import {
  Repositories,
  Repositories_nodes,
  Repositories_nodes_object_Blob_package_dependencies
} from '../../data/Repository/__generated-types/Repositories'
import {
  NodeLibrary,
  NodeLibrary_dependents
} from '../../data/Library/__generated-types/NodeLibrary'
import { InMemoryCache } from 'apollo-boost'
import { NPMSPackage } from '../../utils/npms'
import { path, compose, defaultTo } from 'ramda'

const nodes: ResolverFunction = async (_, __, { cache }) => {
  const dependentsMap = createDependentsMap(getRepositories(cache))
  const response = await fetchLibraries(Array.from(dependentsMap.keys()))
  if (!response.ok) throw new Error(response.status.toString())
  const record: Record<any, NPMSPackage> = await response.json()
  return Object.values(record).map<NodeLibrary>(
    ({
      collected: {
        metadata: { name, version }
      }
    }) => ({
      id: name,
      name,
      version,
      dependents: dependentsMap.get(name) || [],
      __typename: 'NodeLibrary'
    })
  )
}

export default {
  nodes
}

const fetchLibraries = (names: string[]) =>
  fetch('https://api.npms.io/v2/package/mget', {
    method: 'POST',
    body: JSON.stringify(names),
    headers: { 'Content-Type': 'application/json' }
  })

type Dependencies = Repositories_nodes_object_Blob_package_dependencies[]
const extractRepositoryDependencies = compose<
Repositories_nodes,
Dependencies | undefined,
Dependencies
>(
  defaultTo([]),
  path(['object', 'package', 'dependencies'])
)

// function extractDependencies (repositories: Repositories_nodes[]) {
//   const dependencies = new Set<string>()
//   console.log(createDependentsMap(repositories))
//   repositories.forEach((repo) => (
//     extractRepositoryDependencies(repo)
//     .forEach(dependency => dependencies.add(dependency.name))
//   ))
//   return Array.from(dependencies)
// }

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

function getRepositories (cache: InMemoryCache) {
  const id: Repositories['__typename'] = 'RepositoryConnection'
  const data = cache.readFragment<Repositories>({
    fragment: REPOSITORIES_FRAGMENT,
    fragmentName: 'Repositories',
    id
  })
  if (!data || !data.nodes) return []
  return data.nodes as Repositories_nodes[]
}
