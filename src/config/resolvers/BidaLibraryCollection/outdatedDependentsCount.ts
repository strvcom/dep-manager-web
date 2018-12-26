import { createResolver } from '../../../utils/ResolverFunction'
import gql from 'graphql-tag'
import { OutdatedDependentsCountRoot } from './__generated-types/OutdatedDependentsCountRoot'
import {
  OutdatedDependentsCountQuery,
  OutdatedDependentsCountQueryVariables
} from './__generated-types/OutdatedDependentsCountQuery'

const QUERY = gql`
  query OutdatedDependentsCountQuery($department: BidaDepartment!) {
    libraries(department: $department) @client {
      ...OutdatedDependentsCountRoot
    }
  }
  fragment OutdatedDependentsCountRoot on BidaLibraryCollection {
    id
    department
    nodes {
      ... on BidaNodeLibrary {
        id
        outdatedDependents
      }
    }
  }
`

export default createResolver<OutdatedDependentsCountRoot>(async ({ root }) => {
  const { default: client } = await import('../../apolloClient')
  const {
    data: { libraries }
  } = await client.query<
  OutdatedDependentsCountQuery,
  OutdatedDependentsCountQueryVariables
  >({
    query: QUERY,
    variables: { department: root.department },
    fetchPolicy: 'cache-first'
  })
  return libraries.nodes.reduce((acc, node) => acc + node.outdatedDependents, 0)
})
