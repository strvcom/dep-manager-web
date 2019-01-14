import { createResolver } from '../../../utils/apollo-utils'
import gql from 'graphql-tag'
import { BidaNodeProjectPushedAt } from './__generated-types/BidaNodeProjectPushedAt'

const FRAGMENT = gql`
  fragment BidaNodeProjectPushedAt on BidaNodeProject {
    id
    pushedAt
  }
`

export default createResolver<BidaNodeProjectPushedAt>(
  ({ root, cache, getCacheKey }) => {
    const project = cache.readFragment<BidaNodeProjectPushedAt>({
      fragment: FRAGMENT,
      id: getCacheKey(root)
    })
    if (!project) return null
    return project.pushedAt
  }
)
