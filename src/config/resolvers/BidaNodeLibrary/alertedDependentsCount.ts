import { createResolver } from '../../../utils/apollo-utils'
import gql from 'graphql-tag'
import { BidaNodeLibraryAlertedDependentsCount } from './__generated-types/BidaNodeLibraryAlertedDependentsCount'
import versionDiff from '../../../utils/version-diff'

const FRAGMENT = gql`
  fragment BidaNodeLibraryAlertedDependentsCount on BidaNodeLibrary {
    id
    version
    dependents {
      id
      version
    }
  }
`

export default createResolver<BidaNodeLibraryAlertedDependentsCount>(
  ({ root, cache, getCacheKey }) => {
    const result = cache.readFragment<BidaNodeLibraryAlertedDependentsCount>({
      fragment: FRAGMENT,
      id: getCacheKey(root)
    })
    if (!result) return 0
    const { dependents, version } = result
    return dependents.reduce(
      (acc, dependent) =>
        versionDiff(version, dependent.version) === 'minor' ? acc + 1 : acc,
      0
    )
  }
)
