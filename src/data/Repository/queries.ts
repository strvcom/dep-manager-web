import gql from 'graphql-tag'
import { REPOSITORIES_FRAGMENT } from './fragments'

export const REPOSITORIES_QUERY = gql`
  query RepositoriesQuery {
    organization(login: "strvcom") {
      id
      repositories(first: 100) {
        ...Repositories
      }
    }
  }
  ${REPOSITORIES_FRAGMENT}
`
