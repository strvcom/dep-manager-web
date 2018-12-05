import { InMemoryCache } from 'apollo-cache-inmemory'
import { Department } from '../../../data/__generated-types'
import { LibraryQuery_library } from '../../../data/Library/__generated-types/LibraryQuery'
import { NODE_LIBRARY_FRAGMENT } from '../../../data/Library'

export default (
  _: any,
  { id, department }: { id: string; department: Department },
  { cache }: { cache: InMemoryCache }
) => {
  if (department !== Department.FRONTEND) return null
  return cache.readFragment<LibraryQuery_library>({
    fragment: NODE_LIBRARY_FRAGMENT,
    id: `NodeLibrary:${id}`
  })
}
