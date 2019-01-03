import { createResolver } from '../../../utils/apollo-utils'
import gql from 'graphql-tag'
import { BidaNodeLibraryOutdatedDependentsCount } from './__generated-types/BidaNodeLibraryOutdatedDependentsCount'
import versionDiff from '../../../utils/version-diff'

const FRAGMENT = gql`
  fragment BidaNodeLibraryOutdatedDependentsCount on BidaNodeLibrary {
    id
    version
    dependents {
      id
      version
    }
  }
`

export default createResolver<BidaNodeLibraryOutdatedDependentsCount>(
  ({ root, cache, getCacheKey }) => {
    const result = cache.readFragment<BidaNodeLibraryOutdatedDependentsCount>({
      fragment: FRAGMENT,
      id: getCacheKey(root)
    })
    if (!result) return 0
    const { dependents, version } = result
    return dependents.reduce(
      (acc, dependent) =>
        versionDiff(version, dependent.version) === 'major' ? acc + 1 : acc,
      0
    )
  }
)
