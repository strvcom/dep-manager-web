import gql from 'graphql-tag'
import { NODE_LIBRARY_FRAGMENT } from './fragments'

export const LIBRARIES_QUERY = gql`
  query LibrariesQuery($department: Department!) {
    libraries(department: $department) @client {
      id
      nodes {
        ...NodeLibrary
      }
    }
  }
  ${NODE_LIBRARY_FRAGMENT}
`
