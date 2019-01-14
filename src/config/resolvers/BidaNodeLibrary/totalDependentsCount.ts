import { createResolver } from '../../../utils/apollo-utils'
import gql from 'graphql-tag'
import { BidaNodeLibraryTotalDependentsCount } from './__generated-types/BidaNodeLibraryTotalDependentsCount'

const FRAGMENT = gql`
  fragment BidaNodeLibraryTotalDependentsCount on BidaNodeLibrary {
    id
    dependents {
      id
    }
  }
`

export default createResolver<BidaNodeLibraryTotalDependentsCount>(
  ({ root, cache, getCacheKey }) => {
    const result = cache.readFragment<BidaNodeLibraryTotalDependentsCount>({
      fragment: FRAGMENT,
      id: getCacheKey(root)
    })
    if (!result) return 0
    return result.dependents.length
  }
)
