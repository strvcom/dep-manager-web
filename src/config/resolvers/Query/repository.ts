import { REPOSITORY_FRAGMENT } from '../../../data/Repository'
import { Repository } from '../../../data/Repository/__generated-types/Repository'
import { InMemoryCache } from 'apollo-cache-inmemory'

export default (
  _: any,
  { name }: { name: string },
  { cache }: { cache: InMemoryCache }
) => {
  return cache.readFragment<Repository>({
    fragment: REPOSITORY_FRAGMENT,
    fragmentName: 'Repository',
    id: `Repository:${name}`
  })
}
