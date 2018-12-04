import React from 'react'
import { useQuery } from '../../utils/apollo-hooks'
import {
  LibrariesQueryVariables,
  LibrariesQuery
} from './__generated-types/LibrariesQuery'
import { LIBRARIES_QUERY } from './queries'

export function useLibraries (variables: LibrariesQueryVariables) {
  const {
    data: { libraries },
    ...rest
  } = useQuery<LibrariesQuery, LibrariesQueryVariables>(
    LIBRARIES_QUERY,
    { variables },
    [variables.department, variables.repository]
  )
  return React.useMemo(() => ({ ...rest, data: libraries }), [
    libraries,
    rest.loading,
    rest.errors,
    rest.networkStatus,
    rest.stale
  ])
}
