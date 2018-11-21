import React from 'react'
import { LIBRARIES_QUERY } from './queries'
import { useQuery } from '../../utils/apollo-hooks'
import { LibrariesQuery, Department } from '../../config/types'
import { useProjects } from '../Repository'

import { ApolloQueryResult } from 'apollo-boost'

type Nodes = LibrariesQuery['libraries']['nodes']
export function useLibraries (
  department: Department
): ApolloQueryResult<Nodes | null> {
  const projectsResult = useProjects(department)
  if (projectsResult.loading || projectsResult.errors || !projectsResult.data) {
    return projectsResult as ApolloQueryResult<null>
  }
  const { data, ...rest } = useQuery<LibrariesQuery>(LIBRARIES_QUERY)
  return React.useMemo(() => ({ ...rest, data: data.libraries.nodes }), [
    data,
    rest.errors
  ])
}
