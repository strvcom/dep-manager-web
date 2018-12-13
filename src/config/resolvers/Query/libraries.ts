import {
  LibrariesQueryVariables,
  LibrariesQuery,
  LibrariesQuery_libraries
} from '../../../data/Library/__generated-types/LibrariesQuery'
import {
  fetchLibraries,
  LIBRARIES_QUERY,
  NODE_LIBRARY_FRAGMENT
} from '../../../data/Library'
import { Department, RangeInput } from '../../../data/__generated-types'
import { getRepositories, REPOSITORY_FRAGMENT } from '../../../data/Repository'
import {
  Repository,
  Repository_object_Blob_package_dependencies
} from '../../../data/Repository/__generated-types/Repository'
import { identity, defaultTo, compose, path } from 'ramda'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { NodeLibrary } from '../../../data/Library/__generated-types/NodeLibrary'

export default async (
  _: any,
  {
    department,
    range,
    repository
  }: { department: Department; range?: RangeInput; repository?: string },
  { cache }: { cache: InMemoryCache }
) => {
  if (!range && !repository) {
    return fetchLibraries(department, await getRepositories())
  }
  return (repository
    ? getLibrariesByRepository(cache, repository)
    : getLibraries(department)
  ).then(librariesRangeFilter(range))
}

const librariesRangeFilter = (range?: RangeInput) =>
  range
    ? (libraries: LibrariesQuery_libraries[]) =>
      libraries.filter(lib => {
        const libDate = new Date(lib.date)
        return (
          libDate >= (range.from || 0) &&
            libDate <= (range.to || Number.MAX_SAFE_INTEGER)
        )
      })
    : identity

type Dependencies = Repository_object_Blob_package_dependencies[]
const extractRepositoryDependencies = compose<
Repository,
Dependencies | undefined,
Dependencies
>(
  defaultTo([]),
  path(['object', 'package', 'dependencies'])
)

const getLibraries = async (department: Department) => {
  const { default: client } = await import('../../apolloClient')
  const {
    data: { libraries }
  } = await client.query<LibrariesQuery, LibrariesQueryVariables>({
    query: LIBRARIES_QUERY,
    variables: { department }
  })
  return libraries
}

const getLibrariesByRepository = async (
  cache: InMemoryCache,
  repositoryId?: string
) => {
  const repository = cache.readFragment<Repository>({
    fragment: REPOSITORY_FRAGMENT,
    fragmentName: 'Repository',
    id: `Repository:${repositoryId}`
  })
  if (!repository) return []
  const dependencies = extractRepositoryDependencies(repository)
  return dependencies.reduce<NodeLibrary[]>((acc, dep) => {
    const library = cache.readFragment<NodeLibrary>({
      fragment: NODE_LIBRARY_FRAGMENT,
      id: `NodeLibrary:${dep.name}`
    })
    if (library) acc.push(library)
    return acc
  }, [])
}
