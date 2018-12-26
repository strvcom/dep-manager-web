import { createResolver } from '../../../utils/ResolverFunction'
import gql from 'graphql-tag'
import { LibraryCollectionRoot } from './__generated-types/LibraryCollectionRoot'

gql`
  fragment LibraryCollectionRoot on BidaLibraryCollection {
    nodes {
      id
    }
  }
`
export default createResolver<LibraryCollectionRoot>(({ root, context }) => {
  return root.nodes.length
})
