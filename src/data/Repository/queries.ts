import gql from 'graphql-tag'

const Project = gql`
  fragment Project on Repository {
    id
    name
    url
    pushedAt
    package: object(expression: "HEAD:package.json") {
      ... on Blob {
        text
      }
    }
  }
`

export const REPOSITORIES_QUERY = gql`
  query RepositoriesSearch {
    rateLimit {
      limit
      cost
      remaining
      resetAt
    }
    organization(login: "strvcom") {
      repositories(first: 50) {
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
  ${Project}
`

export const REPOSITORY_QUERY = gql`
  query RepositorySearch($name: String!) {
    repository(owner: "strvcom", name: $name) {
      url
      name
    }
  }
`
