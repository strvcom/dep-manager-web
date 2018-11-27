import { ResolverFunction } from '../../utils/ResolverFunction'
import {
  LibrariesQueryVariables,
  LibrariesQuery_libraries
} from '../../data/Library/__generated-types/LibrariesQuery'
import { fetchLibraries } from '../../utils/libraries'
import { InMemoryCache } from 'apollo-boost'
import {
  Repositories,
  Repositories_nodes
} from '../../data/Repository/__generated-types/Repositories'
import {
  REPOSITORIES_FRAGMENT,
  REPOSITORIES_QUERY
} from '../../data/Repository'

const nodes: ResolverFunction<LibrariesQueryVariables> = async (
  { id: department }: LibrariesQuery_libraries,
  variables,
  { cache }
) => {
  const repositories = await getRepositories(cache)
  return repositories.length ? fetchLibraries(department, repositories) : []
}

export default {
  nodes
}

function getRepositories (cache: InMemoryCache) {
  const id: Repositories['__typename'] = 'RepositoryConnection'
  const data = cache.readFragment<Repositories>({
    fragment: REPOSITORIES_FRAGMENT,
    fragmentName: 'Repositories',
    id
  })
  if (!data) {
    return new Promise<Repositories_nodes[]>((resolve, reject) => {
      const unsubscribe = cache.watch({
        query: REPOSITORIES_QUERY,
        optimistic: true,
        callback: () => {
          const repositories = cache.readFragment<Repositories>({
            fragment: REPOSITORIES_FRAGMENT,
            fragmentName: 'Repositories',
            id
          })
          if (repositories) {
            resolve(repositories.nodes as Repositories_nodes[])
            unsubscribe()
          }
        }
      })
    })
  }
  return data && 'nodes' in data ? (data.nodes as Repositories_nodes[]) : []
}
