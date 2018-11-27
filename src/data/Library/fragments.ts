import gql from 'graphql-tag'

export const NODE_LIBRARY_FRAGMENT = gql`
  fragment NodeLibrary on NodeLibrary {
    id
    name
    version
    date
    dependents {
      id
      name
      version
    }
  }
`
