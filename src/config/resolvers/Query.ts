import { ResolverFunction } from '../../utils/ResolverFunction'
import {
  LibrariesQueryVariables,
  LibrariesQuery_libraries
} from '../../data/Library/__generated-types/LibrariesQuery'
import { Omit } from 'utility-types'

const libraries: ResolverFunction<LibrariesQueryVariables> = async (
  _,
  { department }
): Promise<Omit<LibrariesQuery_libraries, 'nodes'>> => {
  return {
    __typename: 'LibraryCollection',
    id: department
  }
}

export default {
  libraries
}
