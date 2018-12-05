import React from 'react'
import { useQuery } from '../../utils/apollo-hooks'
import {
  RepositoriesQuery,
  RepositoriesQuery_organization_repositories_nodes,
  RepositoriesQuery_organization
} from './__generated-types/RepositoriesQuery'
import { REPOSITORIES_QUERY, REPOSITORY_QUERY } from './queries'
import { Department } from '../__generated-types'
import {
  RepositoryQuery,
  RepositoryQueryVariables
} from './__generated-types/RepositoryQuery'

export function useRepositories (department: Department) {
  const {
    data: { organization },
    ...rest
  } = useQuery<RepositoriesQuery>(REPOSITORIES_QUERY)
  return React.useMemo(
    () => ({ ...rest, data: extractNodes(organization, department) }),
    [
      organization,
      department,
      rest.loading,
      rest.errors,
      rest.networkStatus,
      rest.stale
    ]
  )
}

export function useRepository (variables: RepositoryQueryVariables) {
  return useQuery<RepositoryQuery, RepositoryQueryVariables>(REPOSITORY_QUERY, {
    variables
  })
}

function extractNodes (
  organization: RepositoriesQuery_organization | null,
  department: Department
) {
  if (!organization) return null
  const {
    repositories: { nodes }
  } = organization
  if (!nodes) return null
  return nodes.filter(node => {
    if (!node) return false
    if (department === Department.FRONTEND) return Boolean(node.object)
    return false
  }) as RepositoriesQuery_organization_repositories_nodes[]
}
