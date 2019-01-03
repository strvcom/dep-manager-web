import { createResolver } from '../../../utils/apollo-utils'
import gql from 'graphql-tag'
import { BidaIOSProjectPushedAt } from './__generated-types/BidaIOSProjectPushedAt'

const FRAGMENT = gql`
  fragment BidaIOSProjectPushedAt on BidaIOSProject {
    id
    pushedAt
  }
`

export default createResolver<BidaIOSProjectPushedAt>(
  ({ root, cache, getCacheKey }) => {
    const project = cache.readFragment<BidaIOSProjectPushedAt>({
      fragment: FRAGMENT,
      id: getCacheKey(root)
    })
    if (!project) return null
    return project.pushedAt
  }
)
