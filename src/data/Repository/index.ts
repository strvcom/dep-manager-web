import gql from 'graphql-tag'
import { GithubRepositories } from './__generated-types/GithubRepositories'
import { GithubRepository } from './__generated-types/GithubRepository'

const GITHUB_REPOSITORIES_QUERY = gql`
  query GithubRepositories {
    organization(login: "strvcom") {
      id
      repositories(first: 100) {
        nodes {
          ...GithubRepository
        }
      }
    }
  }
  fragment GithubRepository on Repository {
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

export async function queryRepositories () {
  const { default: client } = await import('../../config/apolloClient')
  const {
    data: { organization }
  } = await client.query<GithubRepositories>({
    query: GITHUB_REPOSITORIES_QUERY,
    fetchPolicy: 'cache-first'
  })
  return organization && organization.repositories.nodes
    ? (organization.repositories.nodes as GithubRepository[])
    : []
}
