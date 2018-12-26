import gql from 'graphql-tag'
import { NodeProjectDependencyRoot } from './__generated-types/NodeProjectDependencyRoot'
import { createResolver } from '../../../utils/ResolverFunction'

gql`
  fragment NodeProjectDependencyRoot on BidaNodeProjectDependency {
    name
  }
`
export default createResolver<NodeProjectDependencyRoot>(
  ({ root, getCacheKey }) => {
    return getCacheKey({
      __typename: 'NodeLibrary',
      id: root.name
    })
  }
)
