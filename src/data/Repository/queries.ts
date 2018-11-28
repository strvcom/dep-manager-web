import gql from 'graphql-tag'
import { REPOSITORY_FRAGMENT } from './fragments'

export const REPOSITORIES_QUERY = gql`
  query RepositoriesQuery {
    organization(login: "strvcom") {
      id
      repositories(first: 100) {
        nodes {
          ...Repository
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`

export const GITHUB_REPOSITORIES_QUERY = gql`
  query GithubRepositoriesQuery {
    organization(login: "strvcom") {
      id
      repositories(first: 100) {
        nodes {
          id
          name
          url
          pushedAt
          isArchived
          object(expression: "HEAD:package.json") {
            ... on Blob {
              id
              text
              package @client {
                id
                dependencies {
                  id
                  name
                  version
                }
              }
            }
          }
        }
      }
    }
  }
`
