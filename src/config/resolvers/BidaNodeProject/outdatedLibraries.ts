import { createResolver } from '../../../utils/apollo-utils'
import gql from 'graphql-tag'
import { BidaNodeProjectDependencies } from './__generated-types/BidaNodeProjectDependencies'
import { reduceLibrariesInfo } from './helpers'

const QUERY = gql`
  fragment BidaNodeProjectDependencies on BidaNodeProject {
    id
    department
    dependencies {
      id
      name
      version
    }
  }
`

const outdatedLibraries = createResolver<BidaNodeProjectDependencies>(
  ({ root, cache, getCacheKey }) => {
    const result = cache.readFragment<BidaNodeProjectDependencies>({
      fragment: QUERY,
      id: getCacheKey(root)
    })
    if (!result) return null
    return reduceLibrariesInfo(result, cache).outdatedLibraries
  }
)

export default outdatedLibraries
