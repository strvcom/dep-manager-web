import gql from 'graphql-tag'
import { NODE_LIBRARY_FRAGMENT } from './fragments'

export const LIBRARIES_QUERY = gql`
  query LibrariesQuery(
    $department: Department!
    $range: RangeInput
    $repository: String
  ) {
    libraries(department: $department, range: $range, repository: $repository)
      @client {
      ...NodeLibrary
    }
  }
  ${NODE_LIBRARY_FRAGMENT}
`
