import { createResolver } from '../../../utils/apollo-utils'
import gql from 'graphql-tag'
import { QueryProjects_projects } from '../Query/__generated-types/QueryProjects'
import {
  BidaProjectCollectionNodes,
  BidaProjectCollectionNodes_nodes
} from './__generated-types/BidaProjectCollectionNodes'

const FRAGMENT = gql`
  fragment BidaProjectCollectionNodes on BidaProjectCollection {
    id
    nodes {
      id
      __typename
    }
  }
`

export default createResolver<
QueryProjects_projects,
null,
BidaProjectCollectionNodes_nodes[]
>(({ root, cache, getCacheKey }) => {
  const result = cache.readFragment<BidaProjectCollectionNodes>({
    fragment: FRAGMENT,
    id: getCacheKey(root)
  })
  if (!result) return []
  return result.nodes
})
