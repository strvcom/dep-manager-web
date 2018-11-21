import React from 'react'
import { REPOSITORIES_QUERY, REPOSITORY_QUERY } from './queries'
import { useQuery } from '../../utils/apollo-hooks'
import {
  RepositoriesSearch,
  RepositoriesSearchVariables
} from './__generated-types/RepositoriesSearch'
import { Department } from '../../config/types'
import { Repository } from './__generated-types/Repository'
import {
  RepositorySearch,
  RepositorySearchVariables
} from './__generated-types/RepositorySearch'
// import compose from 'ramda/es/compose';
// import prop from 'ramda/es/prop';
// import PackageJSON from '../../utils/package-json'

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
    if (department === Department.FRONTEND) return Boolean(node.object)
    return false
  }) as Repository[]
}

export function useProjects (department: Department) {
  const result = useQuery<RepositoriesSearch, RepositoriesSearchVariables>(
    REPOSITORIES_QUERY,
    {
      variables: { first: 100 }
    }
  )
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
