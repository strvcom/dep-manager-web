import { InMemoryCache } from 'apollo-boost'
import {
  Repositories,
  Repositories_nodes
} from './__generated-types/Repositories'
import { REPOSITORIES_FRAGMENT } from './fragments'
import { REPOSITORIES_QUERY } from './queries'

export function getRepositories (cache: InMemoryCache) {
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
