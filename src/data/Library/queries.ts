import gqlLocal from 'graphql-tag'

export const LIBRARIES_QUERY = gqlLocal`
  query LibrariesQuery {
    libraries @client {
      nodes {
        ...on NodeLibrary {
          id
          name
          version
        }
      }
    }
  }
`
