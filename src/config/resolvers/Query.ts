import { ResolverFunction } from '../../utils/ResolverFunction'
import {
  LibrariesQueryVariables,
  LibrariesQuery
} from '../../data/Library/__generated-types/LibrariesQuery'
import { Department } from '../../data/__generated-types'

type LibraryCollection = LibrariesQuery['libraries']

// tslint:disable-next-line:variable-name
const __typename = 'LibraryCollection'

const libraries: ResolverFunction<LibrariesQueryVariables> = (
  _,
  { department },
  { cache }
): Partial<LibraryCollection> => {
  switch (department) {
    case Department.FRONTEND:
      return { __typename, id: department }
    default:
      return { __typename, id: department, nodes: [] }
  }
}

export default {
  libraries
}
