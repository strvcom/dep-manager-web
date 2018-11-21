import React from 'react'
import { LIBRARIES_QUERY } from './queries'
import { useQuery } from '../../utils/apollo-hooks'
import { useProjects } from '../Repository'

import { ApolloQueryResult } from 'apollo-boost'
import {
  LibrariesQuery_libraries_nodes,
  LibrariesQuery
} from './__generated-types/LibrariesQuery'
import { Department } from '../../config/types'

export function useLibraries (
  department: Department
): ApolloQueryResult<LibrariesQuery_libraries_nodes[] | null> {
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
