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
import { REPOSITORIES_FRAGMENT } from '../../data/Repository'

const nodes: ResolverFunction<LibrariesQueryVariables> = (
  { id: department }: LibrariesQuery_libraries,
  variables,
  { cache }
) => fetchLibraries(department, getRepositories(cache))

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
  return data && 'nodes' in data ? (data.nodes as Repositories_nodes[]) : []
}
