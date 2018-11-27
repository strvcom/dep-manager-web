import { Department } from '../__generated-types'
import { useQuery } from '../../utils/apollo-hooks'
import {
  LibrariesQueryVariables,
  LibrariesQuery
} from './__generated-types/LibrariesQuery'
import { LIBRARIES_QUERY } from './queries'

export function useLibraries (department: Department) {
  const {
    data: { libraries }
  } = useQuery<LibrariesQuery, LibrariesQueryVariables>(
    LIBRARIES_QUERY,
    {
      variables: { department }
    },
    [department]
  )
  return libraries
}
