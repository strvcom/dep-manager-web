import { createResolver } from '../../../utils/apollo-utils'
import gql from 'graphql-tag'
import { BidaLibraryCollectionTotalCount } from './__generated-types/BidaLibraryCollectionTotalCount'

gql`
  fragment BidaLibraryCollectionTotalCount on BidaLibraryCollection {
    id
    nodes {
      id
    }
  }
`
export default createResolver<BidaLibraryCollectionTotalCount>(
  ({ root, cache, getCacheKey }) => {
    return root.nodes.length
  }
)
