import { createResolver } from '../../../utils/apollo-utils'
import gql from 'graphql-tag'
import { AlertedDependentsCountRoot } from './__generated-types/AlertedDependentsCountRoot'

gql`
  fragment AlertedDependentsCountRoot on BidaLibraryCollection {
    id
  }
`

export default createResolver<AlertedDependentsCountRoot>(() => 0)
