import gql from 'graphql-tag'

export const NODE_PACKAGE_FRAGMENT = gql`
  fragment NodePackageBlob on Blob {
    id
    text
    package @client {
      id
      name
      version
      dependencies {
        id
        name
        version
      }
    }
  }
`

export const REPOSITORY_FRAGMENT = gql`
  fragment Repository on Repository {
    id
    name
    url
    pushedAt
    isArchived
    object(expression: "HEAD:package.json") {
      ...NodePackageBlob
    }
  }
  ${NODE_PACKAGE_FRAGMENT}
`

export const REPOSITORIES_FRAGMENT = gql`
  fragment Repositories on RepositoryConnection {
    totalCount
    nodes {
      ...Repository
    }
  }
  ${REPOSITORY_FRAGMENT}
`
