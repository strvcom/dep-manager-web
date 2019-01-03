import gql from 'graphql-tag'
import { NodeProjectDependencyRoot } from './__generated-types/NodeProjectDependencyRoot'
import { createResolver } from '../../../utils/apollo-utils'

gql`
  fragment NodeProjectDependencyRoot on BidaNodeProjectDependency {
    name
  }
`
export default createResolver<NodeProjectDependencyRoot>(
  ({ root, getCacheKey, cache }) => {
    return cache.readFragment({
      id: getCacheKey({
        __typename: 'BidaNodeLibrary',
        id: root.name
      }),
      fragment: gql`
        fragment BidaNodeProjectDependencyLibrary on BidaNodeLibrary {
          id
          name
          date
          version
          license
        }
      `
    })
  }
)
