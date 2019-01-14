import { createResolver } from '../../../utils/apollo-utils'
import gql from 'graphql-tag'
import { TotalArchivedRoot } from './__generated-types/TotalArchivedRoot'

gql`
  fragment TotalArchivedRoot on BidaProjectCollection {
    id
    nodes {
      id
    }
  }
`

export default createResolver<TotalArchivedRoot>(({ root }) => 0)
