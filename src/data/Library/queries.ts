import gql from 'graphql-tag'

export const NODE_LIBRARY_FRAGMENT = gql`
  fragment NodeLibrary on NodeLibrary {
    id
    name
    version
    dependents {
      id
      name
      version
    }
  }
`
export const ANDROID_LIBRARY_FRAGMENT = gql`
  fragment AndroidLibrary on AndroidLibrary {
    id
    name
    version
    dependents {
      id
      name
      version
    }
  }
`
export const IOS_LIBRARY_FRAGMENT = gql`
  fragment IOSLibrary on IOSLibrary {
    id
    name
    version
    dependents {
      id
      name
      version
    }
  }
`

export const LIBRARIES_QUERY = gql`
  query LibrariesQuery($department: Department!) {
    libraries(department: $department) @client {
      id
      nodes {
        ...NodeLibrary
        ...AndroidLibrary
        ...IOSLibrary
      }
    }
  }
  ${NODE_LIBRARY_FRAGMENT}
  ${ANDROID_LIBRARY_FRAGMENT}
  ${IOS_LIBRARY_FRAGMENT}
`
