import { createResolver } from '../../../utils/apollo-utils'
import gql from 'graphql-tag'
import { BidaIOSProjectName } from './__generated-types/BidaIOSProjectName'

const FRAGMENT = gql`
  fragment BidaIOSProjectName on BidaIOSProject {
    id
    name
  }
`

export default createResolver<BidaIOSProjectName>(
  ({ root, cache, getCacheKey }) => {
    const project = cache.readFragment<BidaIOSProjectName>({
      fragment: FRAGMENT,
      id: getCacheKey(root)
    })
    if (!project) return null
    return project.name
  }
)
