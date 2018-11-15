import React from 'react'
import { REPOSITORIES_QUERY, REPOSITORY_QUERY } from '../../data/Repository'
import {
  RepositoriesSearch,
  RepositorySearch,
  RepositorySearchVariables,
  Project
} from '../types'
import { useQuery } from '../../utils/apollo-hooks'
import { Department } from '../../routes/routes'

function extractNodes (
  { organization }: RepositoriesSearch,
  department: Department
) {
  if (!organization) return null
  const {
    repositories: { nodes }
  } = organization
  if (!nodes) return null
  return nodes.filter(node => {
    if (!node) return false
    if (department === Department.FRONTEND) return Boolean(node.package)
    return false
  }) as Project[]
}

export function useProjects (department: Department) {
  const result = useQuery<RepositoriesSearch>(REPOSITORIES_QUERY)
  return React.useMemo(
    () => ({ ...result, data: extractNodes(result.data, department) }),
    [result.data, result.errors, result.loading, department]
  )
}

export function useProject (name: string) {
  const result = useQuery<RepositorySearch, RepositorySearchVariables>(
    REPOSITORY_QUERY,
    { variables: { name } },
    [name]
  )
  return React.useMemo(() => ({ ...result, data: result.data.repository }), [
    result.data,
    result.errors,
    result.loading,
    name
  ])
}
