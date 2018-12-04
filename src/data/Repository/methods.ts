import { Repositories_nodes } from './__generated-types/Repositories'
import { REPOSITORIES_QUERY } from './queries'
import { RepositoriesQuery } from './__generated-types/RepositoriesQuery'
import {
  Repository_object,
  Repository_object_Blob
} from './__generated-types/Repository'
import {
  RepositoryDetails_object,
  RepositoryDetails_object_Blob
} from './__generated-types/RepositoryDetails'

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

export function isBlob(
  object: RepositoryDetails_object
): object is RepositoryDetails_object_Blob
export function isBlob(
  object: Repository_object
): object is Repository_object_Blob
export function isBlob (
  object: Repository_object | RepositoryDetails_object
): object is Repository_object_Blob | RepositoryDetails_object_Blob {
  return object.__typename === 'Blob'
}
