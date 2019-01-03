import versionDiff from '../../../utils/version-diff'
import gql from 'graphql-tag'
import { NodeProjectRoot } from './__generated-types/NodeProjectRoot'
import { NodeLibraryVersion } from './__generated-types/NodeLibraryVersion'
import { ApolloCache } from 'apollo-cache'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'

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

export const reduceLibrariesInfo = (
  project: NodeProjectRoot,
  cache: ApolloCache<NormalizedCacheObject>
) => {
  return project.dependencies.reduce(
    (acc, dependency) => {
      if (typeof dependency.version !== 'string') return acc
      const library = cache.readFragment<NodeLibraryVersion>({
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
