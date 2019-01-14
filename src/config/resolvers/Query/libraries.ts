import { createResolver } from '../../../utils/apollo-utils'
import gql from 'graphql-tag'
import { LibrariesQueryVariables } from './__generated-types/LibrariesQuery'
import { Nodes } from './__generated-types/Nodes'
import { ApolloCache } from 'apollo-cache'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import { BidaDepartment } from '../../../data/__generated-types'

gql`
  query LibrariesQuery(
    $department: BidaDepartment!
    $from: Date
    $to: Date
    $projectId: String
  ) {
    libraries(
      department: $department
      from: $from
      to: $to
      projectId: $projectId
    ) {
      ...QueryBidaLibraryCollection
    }
  }
  fragment QueryBidaLibraryCollection on BidaLibraryCollection {
    id
    from
    to
    projectId
    department
  }
`
export default createResolver<{}, LibrariesQueryVariables>(
  ({ variables, root, cache, getCacheKey }) => {
    if (variables.from || variables.to || variables.projectId) {
      return {
        __typename: 'BidaLibraryCollection',
        ...variables,
        nodes: getAllLibraryNodes(cache, variables.department).filter(
          library => new Date(library.date) >= (variables.from || 0)
        ),
        id: createId(variables)
      }
    }
    return null
  }
)

const getAllLibraryNodes = (
  cache: ApolloCache<NormalizedCacheObject>,
  department: BidaDepartment
) => {
  const result = cache.readFragment<Nodes>({
    fragment: gql`
      fragment Nodes on BidaLibraryCollection {
        nodes {
          id
          date
          name
          ... on BidaNodeLibrary {
            version
            dependents {
              version
            }
          }
        }
      }
    `,
    id: `BidaLibraryCollection:${department}`
  })
  if (!result) return []
  return result.nodes
}

function createId ({
  department,
  projectId,
  from,
  to
}: LibrariesQueryVariables) {
  let id: string = department
  if (projectId) id += `:${projectId}`
  if (to) id += `:${(to as Date).valueOf()}`
  if (from) id += `:${(from as Date).valueOf()}`
  return id
}
