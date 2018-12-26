import { BidaDepartment } from '../../../data/__generated-types'
import { createResolver } from '../../../utils/ResolverFunction'
import {
  LibrariesRootVariables,
  LibrariesRoot
} from './__generated-types/LibrariesRoot'
import gql from 'graphql-tag'
import { LibraryCollectionResult } from './__generated-types/LibraryCollectionResult'
import {
  ProjectsDependencies,
  ProjectsDependenciesVariables
} from './__generated-types/ProjectsDependencies'
import { fetchLibraries } from '../../../data/Library/index'
import { LibraryResult } from './__generated-types/LibraryResult'
import { identity } from 'ramda'

gql`
  query LibrariesRoot(
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
    ) {
      ...LibraryCollectionResult
    }
  }
  fragment LibraryCollectionResult on BidaLibraryCollection {
    id
    department
    nodes {
      ...LibraryResult
    }
  }
  fragment LibraryResult on BidaLibrary {
    id
    date
  }
`

const PROJECTS_QUERY = gql`
  query ProjectsDependencies($department: BidaDepartment!) {
    projects(department: $department) @client {
      id
      nodes {
        id
        name
        ... on BidaNodeProject {
          dependencies {
            id
            name
            version
          }
        }
      }
    }
  }
`

async function queryProjects (department: BidaDepartment) {
  const { default: client } = await import('../../apolloClient')
  await client.query<ProjectsDependencies, ProjectsDependenciesVariables>({
    query: PROJECTS_QUERY,
    variables: { department },
    fetchPolicy: 'cache-first'
  })
}

export default createResolver<
LibrariesRoot,
LibrariesRootVariables,
Promise<LibraryCollectionResult>
>(async ({ variables }) => {
  await queryProjects(variables.department)
  const data: LibraryCollectionResult = {
    __typename: 'BidaLibraryCollection',
    id: createId(variables),
    department: variables.department,
    nodes: await getLibraries(variables)
  }
  return data
})

function createId ({
  department,
  projectName,
  from,
  to
}: LibrariesRootVariables) {
  let id: string = department
  if (projectName) id += `:${projectName}`
  if (to) id += `:${(to as Date).valueOf()}`
  if (from) id += `:${(from as Date).valueOf()}`
  return id
}

async function getLibraries ({ department, from, to }: LibrariesRootVariables) {
  const libraries = libraryRangeFilter(from, to)(
    await fetchLibraries(department)
  )
  return libraries
}

const libraryRangeFilter = (from?: Date, to?: Date) =>
  from || to
    ? (libraries: LibraryResult[]) => {
      return libraries.filter(library => {
        const libDate = new Date(library.date)
        return (
          libDate >= (from || 0) && libDate <= (to || Number.MAX_SAFE_INTEGER)
        )
      })
    }
    : identity
