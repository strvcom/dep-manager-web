import { createResolver } from '../../../utils/apollo-utils'
import gql from 'graphql-tag'
import { BidaNodeProjectName } from './__generated-types/BidaNodeProjectName'

const FRAGMENT = gql`
  fragment BidaNodeProjectName on BidaNodeProject {
    id
    name
  }
`

export default createResolver<BidaNodeProjectName>(
  ({ root, cache, getCacheKey }) => {
    const project = cache.readFragment<BidaNodeProjectName>({
      fragment: FRAGMENT,
      id: getCacheKey(root)
    })
    if (!project) return null
    return project.name
  }
)
