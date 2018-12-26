import versionDiff from '../../../utils/version-diff'
import gql from 'graphql-tag'
import { NodeProjectRoot } from './__generated-types/NodeProjectRoot'
import { NodeLibraryVersion } from './__generated-types/NodeLibraryVersion'
import {
  NodeLibraries,
  NodeLibrariesVariables
} from './__generated-types/NodeLibraries'
import { LocalProjectRoot } from './__generated-types/LocalProjectRoot'

gql`
  fragment LocalProjectRoot on BidaProject {
    __typename
  }
  fragment NodeProjectRoot on BidaNodeProject {
    id
    department
    dependencies {
      id
      name
      version
    }
  }
`

const NODE_LIBRARIES_QUERY = gql`
  query NodeLibraries($department: BidaDepartment!) {
    libraries(department: $department) @client {
      nodes {
        ... on BidaNodeLibrary {
          id
          version
        }
      }
    }
  }
`
export const reduceLibrariesInfo = async (project: NodeProjectRoot) => {
  const { default: client } = await import('../../apolloClient')
  const {
    data: { libraries }
  } = await client.query<NodeLibraries, NodeLibrariesVariables>({
    query: NODE_LIBRARIES_QUERY,
    variables: { department: project.department }
  })
  if (!libraries) return { outdatedLibraries: 0, alertedLibraries: 0 }
  return project.dependencies.reduce(
    (acc, dependency) => {
      if (typeof dependency.version !== 'string') return acc
      const library = client.cache.readFragment<NodeLibraryVersion>({
        id: `BidaNodeLibrary:${dependency.name}`,
        fragment: gql`
          fragment NodeLibraryVersion on BidaNodeLibrary {
            id
            version
          }
        `
      })
      if (!library) return acc
      const diff = versionDiff(library.version, dependency.version)
      if (diff === 'major') acc.outdatedLibraries++
      else if (diff === 'minor') acc.alertedLibraries++
      return acc
    },
    { outdatedLibraries: 0, alertedLibraries: 0 }
  )
}

export function isNodeProject (
  project: LocalProjectRoot
): project is NodeProjectRoot {
  return project.__typename === 'BidaNodeProject'
}
