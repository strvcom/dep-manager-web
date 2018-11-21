import gql from 'graphql-tag'

const NODE_PACKAGE_FRAGMENT = gql`
  fragment NodePackage on Blob {
    id
    text
    name @client
  }
`

const REPOSITORY_FRAGMENT = gql`
  fragment Repository on Repository {
    id
    name
    url
    pushedAt
    isArchived
    object(expression: "HEAD:package.json") {
      ...NodePackage
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

export const REPOSITORIES_QUERY = gql`
  query RepositoriesSearch(
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    organization(login: "strvcom") {
      id
      repositories(first: $first, after: $after, before: $before, last: $last) {
        ...Repositories
      }
    }
  }
  ${REPOSITORIES_FRAGMENT}
`

export const REPOSITORY_QUERY = gql`
  query RepositorySearch($name: String!) {
    repository(owner: "strvcom", name: $name) {
      url
      name
    }
  }
`
