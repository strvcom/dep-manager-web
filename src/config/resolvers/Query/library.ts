import { BidaDepartment } from '../../../data/__generated-types'
import gql from 'graphql-tag'
import { createResolver } from '../../../utils/apollo-utils'
import {
  LibraryRoot,
  LibraryRootVariables,
  LibraryRoot_library
} from './__generated-types/LibraryRoot'

const FRAGMENT = gql`
  fragment QueryLibrary on BidaNodeLibrary {
    id
    __typename
    date
    name
    ... on BidaNodeLibrary {
      version
      dependents {
        id
        version
        name
      }
    }
  }
`
gql`
  query LibraryRoot($id: String!, $department: BidaDepartment!) {
    library(id: $id, department: $department) {
      ...QueryLibrary
    }
  }
  ${FRAGMENT}
`

export default createResolver<LibraryRoot, LibraryRootVariables>(
  ({ variables, getCacheKey, cache }) => {
    const { department, id } = variables
    return cache.readFragment({
      fragment: FRAGMENT,
      id: getCacheKey({ __typename: toTypename(department), id })
    })
  }
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
