import gql from 'graphql-tag'

const PROJECT_FRAGMENT = gql`
  fragment Project on Repository {
    id
    name
    url
    pushedAt
    isArchived
    package: object(expression: "HEAD:package.json") {
      ... on Blob {
        id
        text
      }
    }
  }
`

export const PROJECTS_FRAGMENT = gql`
  fragment Projects on RepositoryConnection {
    nodes {
      ...Project
    }
    totalCount
  }
  ${PROJECT_FRAGMENT}
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
        totalCount
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        nodes {
          ...Project
        }
      }
    }
  }
  ${PROJECT_FRAGMENT}
`

export const REPOSITORY_QUERY = gql`
  query RepositorySearch($name: String!) {
    repository(owner: "strvcom", name: $name) {
      url
      name
    }
  }
`
