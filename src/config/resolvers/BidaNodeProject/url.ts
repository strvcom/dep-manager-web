import { createResolver } from '../../../utils/apollo-utils'
import gql from 'graphql-tag'
import { BidaNodeProjectUrl } from './__generated-types/BidaNodeProjectUrl'

const FRAGMENT = gql`
  fragment BidaNodeProjectUrl on BidaNodeProject {
    id
    url
  }
`

export default createResolver<BidaNodeProjectUrl>(
  ({ root, cache, getCacheKey }) => {
    const project = cache.readFragment<BidaNodeProjectUrl>({
      fragment: FRAGMENT,
      id: getCacheKey(root)
    })
    if (!project) return null
    return project.url
  }
)
