import { useQuery } from '../../utils/apollo-hooks'
import gql from 'graphql-tag'
import {
  AllLibraries,
  AllLibrariesVariables
} from './__generated-types/AllLibraries'
import {
  SingleLibrary,
  SingleLibraryVariables
} from './__generated-types/SingleLibrary'
import {
  LibrariesInfo,
  LibrariesInfoVariables
} from './__generated-types/LibrariesInfo'

const LIBRARIES_QUERY = gql`
  query AllLibraries(
    $department: BidaDepartment!
    $from: Date
    $to: Date
    $projectName: String
  ) {
    libraries(
      department: $department
      from: $from
      to: $to
      projectId: $projectName
    ) @client {
      id
      nodes {
        id
        name
        date
        ... on BidaNodeLibrary {
          totalDependents
          outdatedDependents
          alertedDependents
          license
          version
        }
      }
    }
  }
`

const LIBRARIES_INFO_QUERY = gql`
  query LibrariesInfo(
    $department: BidaDepartment!
    $from: Date
    $to: Date
    $projectName: String
  ) {
    libraries(
      department: $department
      from: $from
      to: $to
      projectId: $projectName
    ) @client {
      totalCount
      alertedDependentsCount
      outdatedDependentsCount
    }
  }
`

const LIBRARY_QUERY = gql`
  query SingleLibrary($id: String!, $department: BidaDepartment!) {
    library(id: $id, department: $department) @client {
      id
      name
    }
  }
`

export function useLibraries (variables: AllLibrariesVariables) {
  return useQuery<AllLibraries, AllLibrariesVariables>(
    LIBRARIES_QUERY,
    { variables },
    [variables.department, variables.projectName, variables.from, variables.to]
  )
}
export function useLibrariesInfo (variables: AllLibrariesVariables) {
  return useQuery<LibrariesInfo, LibrariesInfoVariables>(
    LIBRARIES_INFO_QUERY,
    { variables },
    [variables.department, variables.projectName, variables.from, variables.to]
  )
}

export function useLibrary (variables: SingleLibraryVariables) {
  return useQuery<SingleLibrary, SingleLibraryVariables>(
    LIBRARY_QUERY,
    {
      variables
    },
    [variables.department, variables.id]
  )
}
