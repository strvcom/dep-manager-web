import gql from 'graphql-tag'

export const LIBRARIES_QUERY = gql`
  query LibrariesQuery {
    libraries @client {
      nodes {
        ... on NodeLibrary {
          id
          name
          version
        }
      }
    }
  }
`
