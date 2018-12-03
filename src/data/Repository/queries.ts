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
