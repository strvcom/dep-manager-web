import { Repositories_nodes } from './__generated-types/Repositories'
import { REPOSITORIES_QUERY, GITHUB_REPOSITORIES_QUERY } from './queries'
import { RepositoriesQuery } from './__generated-types/RepositoriesQuery'
import {
  GithubRepositoriesQuery,
  GithubRepositoriesQuery_organization_repositories_nodes
} from './__generated-types/GithubRepositoriesQuery'

export async function getRepositories () {
  const { default: client } = await import('../../config/apolloClient')
  const {
    data: { organization }
  } = await client.query<RepositoriesQuery>({
    query: REPOSITORIES_QUERY
  })
  return organization && organization.repositories.nodes
    ? (organization.repositories.nodes as Repositories_nodes[])
    : []
}

export async function getGithubRepositories () {
  const { default: client } = await import('../../config/apolloClient')
  const {
    data: { organization }
  } = await client.query<GithubRepositoriesQuery>({
    query: GITHUB_REPOSITORIES_QUERY
  })
  return organization && organization.repositories.nodes
    ? (organization.repositories
      .nodes as GithubRepositoriesQuery_organization_repositories_nodes[])
    : []
}
