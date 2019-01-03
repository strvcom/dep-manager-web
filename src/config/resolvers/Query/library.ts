import { BidaDepartment } from '../../../data/__generated-types'
import gql from 'graphql-tag'
import { createResolver } from '../../../utils/apollo-utils'
import {
  LibraryRoot,
  LibraryRootVariables,
  LibraryRoot_library
} from './__generated-types/LibraryRoot'

gql`
  query LibraryRoot($id: String!, $department: BidaDepartment!) {
    library(id: $id, department: $department) {
      id
    }
  }
`

export default createResolver<LibraryRoot, LibraryRootVariables>(
  ({ variables: { department, id }, getCacheKey }) =>
    getCacheKey({ __typename: toTypename(department), id })
)

function toTypename (
  department: BidaDepartment
): LibraryRoot_library['__typename'] {
  switch (department) {
    case BidaDepartment.FRONTEND:
    case BidaDepartment.BACKEND:
      return 'BidaNodeLibrary'
    default:
      return 'BidaNodeLibrary'
  }
}
