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

export const LIBRARY_QUERY = gql`
  query LibraryQuery($id: String!, $department: Department!) {
    library(id: $id, department: $department) @client {
      ...NodeLibrary
    }
  }
  ${NODE_LIBRARY_FRAGMENT}
`
