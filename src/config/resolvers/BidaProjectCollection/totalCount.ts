import { createResolver } from '../../../utils/apollo-utils'
import gql from 'graphql-tag'
import { QueryProjects_projects } from '../Query/__generated-types/QueryProjects'
import { BidaProjectCollectionTotalCount } from './__generated-types/BidaProjectCollectionTotalCount'

const FRAGMENT = gql`
  fragment BidaProjectCollectionTotalCount on BidaProjectCollection {
    id
    nodes {
      id
    }
  }
`

export default createResolver<QueryProjects_projects, null, number>(
  ({ root, cache, getCacheKey }) => {
    const result = cache.readFragment<BidaProjectCollectionTotalCount>({
      fragment: FRAGMENT,
      id: getCacheKey(root)
    })
    if (!result) return 0
    return result.nodes.length
  }
)
