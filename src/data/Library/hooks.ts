import React from 'react'
import { Department, RangeInput } from '../__generated-types'
import { useQuery } from '../../utils/apollo-hooks'
import {
  LibrariesQueryVariables,
  LibrariesQuery
} from './__generated-types/LibrariesQuery'
import { LIBRARIES_QUERY } from './queries'

export function useLibraries (department: Department, range?: RangeInput) {
  const {
    data: { libraries },
    ...rest
  } = useQuery<LibrariesQuery, LibrariesQueryVariables>(
    LIBRARIES_QUERY,
    {
      variables: { department, range }
    },
    [department]
  )
  return React.useMemo(() => ({ ...rest, data: libraries }), [
    libraries,
    rest.loading,
    rest.errors,
    rest.networkStatus,
    rest.stale
  ])
}
