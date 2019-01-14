import { createResolver } from '../../../utils/apollo-utils'
import gql from 'graphql-tag'
import { BidaIOSProjectUrl } from './__generated-types/BidaIOSProjectUrl'

const FRAGMENT = gql`
  fragment BidaIOSProjectUrl on BidaIOSProject {
    id
    url
  }
`

export default createResolver<BidaIOSProjectUrl>(
  ({ root, cache, getCacheKey }) => {
    const project = cache.readFragment<BidaIOSProjectUrl>({
      fragment: FRAGMENT,
      id: getCacheKey(root)
    })
    if (!project) return null
    return project.url
  }
)
