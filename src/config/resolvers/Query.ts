import { ResolverFunction } from '../../utils/ResolverFunction'
import {
  LibrariesQueryVariables,
  LibrariesQuery
} from '../../data/Library/__generated-types/LibrariesQuery'
import { fetchLibraries, LIBRARIES_QUERY } from '../../data/Library'
import { Department, RangeInput } from '../../data/__generated-types'
import { getRepositories } from '../../data/Repository'

const libraries: ResolverFunction<LibrariesQueryVariables> = async (
  _,
  { department, range },
  { cache }
) =>
  range
    ? getFilteredLibraries(department, range)
    : fetchLibraries(department, await getRepositories())

export default {
  libraries
}

async function getFilteredLibraries (department: Department, range: RangeInput) {
  const { default: client } = await import('../apolloClient')
  const { data } = await client.query<LibrariesQuery, LibrariesQueryVariables>({
    query: LIBRARIES_QUERY,
    variables: { department }
  })
  return data.libraries.filter(lib => {
    const libDate = new Date(lib.date)
    return (
      libDate >= (range.from || 0) &&
      libDate <= (range.to || Number.MAX_SAFE_INTEGER)
    )
  })
}
