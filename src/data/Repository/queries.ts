import gql from 'graphql-tag'
import { REPOSITORY_FRAGMENT, REPOSITORY_DETAILS_FRAGMENT } from './fragments'

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

export const REPOSITORY_QUERY = gql`
  query RepositoryQuery($name: String!) {
    repository(name: $name, owner: "strvcom") @client {
      ...RepositoryDetails
    }
  }
  ${REPOSITORY_DETAILS_FRAGMENT}
`
