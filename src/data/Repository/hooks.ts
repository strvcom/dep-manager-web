import React from 'react'
import { REPOSITORIES_QUERY } from '../../data/Repository'
import {
  RepositoriesSearch,
  RepositoriesSearch_organization_repositories_nodes
} from '../types'
import { useQuery } from '../../utils/apollo-hooks'

function extractNodes ({ organization }: RepositoriesSearch) {
  if (!organization) return null
  const {
    repositories: { nodes }
  } = organization
  if (!nodes) return null
  return nodes.filter(
    Boolean
  ) as RepositoriesSearch_organization_repositories_nodes[]
}

export default function useProjects () {
  const result = useQuery<RepositoriesSearch>(REPOSITORIES_QUERY)
  return React.useMemo(() => ({ ...result, data: extractNodes(result.data) }), [
    result
  ])
}
