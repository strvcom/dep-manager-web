import { createResolver } from '../../../utils/apollo-utils'
import gql from 'graphql-tag'
import { BidaLibraryCollectionOutdatedDependentsCount } from './__generated-types/BidaLibraryCollectionOutdatedDependentsCount'
import versionDiff from '../../../utils/version-diff'
import { BidaLibraryCollectionOutdatedDependentsCountRoot } from './__generated-types/BidaLibraryCollectionOutdatedDependentsCountRoot'

const FRAGMENT = gql`
  fragment BidaLibraryCollectionOutdatedDependentsCountRoot on BidaLibraryCollection {
    ...BidaLibraryCollectionOutdatedDependentsCount
    projectId
  }
  fragment BidaLibraryCollectionOutdatedDependentsCount on BidaLibraryCollection {
    id
    department
    nodes {
      ... on BidaNodeLibrary {
        id
        version
        dependents {
          id
          version
        }
      }
    }
  }
`

export default createResolver<BidaLibraryCollectionOutdatedDependentsCountRoot>(
  ({ root, cache, getCacheKey }) => {
    const result =
      cache.readFragment<BidaLibraryCollectionOutdatedDependentsCount>({
        id: getCacheKey(root),
        fragment: FRAGMENT,
        fragmentName: 'BidaLibraryCollectionOutdatedDependentsCount'
      }) || root
    return result.nodes.reduce(
      (acc, library) =>
        library.dependents
          .filter(
            dependent =>
              !root.projectId || root.projectId === dependent.id.split(':')[0]
          )
          .reduce(
            (innerAcc, dependent) =>
              versionDiff(library.version, dependent.version) === 'major'
                ? innerAcc + 1
                : innerAcc,
            acc
          ),
      0
    )
  }
)
