import { ResolverFunction } from '../../utils/ResolverFunction'
import {
  LibrariesQueryVariables,
  LibrariesQuery
} from '../../data/Library/__generated-types/LibrariesQuery'
import { fetchLibraries, LIBRARIES_QUERY } from '../../data/Library'
import { getRepositories } from '../../data/Repository'

const libraries: ResolverFunction<LibrariesQueryVariables> = async (
  _,
  { department, range },
  { cache }
) => {
  if (range) {
    const { default: client } = await import('../apolloClient')
    // tslint:disable-next-line:no-shadowed-variable
    const {
      data: { libraries }
    } = await client.query<LibrariesQuery, LibrariesQueryVariables>({
      query: LIBRARIES_QUERY,
      variables: { department }
    })
    return libraries.filter(lib => {
      const libDate = new Date(lib.date)
      return (
        libDate >= (range.from || 0) &&
        libDate <= (range.to || Number.MAX_SAFE_INTEGER)
      )
    })
  }
  const repositories = await getRepositories(cache)
  return repositories.length ? fetchLibraries(department, repositories) : []
}

export default {
  libraries
}
