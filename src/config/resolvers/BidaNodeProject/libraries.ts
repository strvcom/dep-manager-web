import { createResolver } from '../../../utils/apollo-utils'
import gql from 'graphql-tag'
import { BidaNodeProjectLibrariesRoot } from './__generated-types/BidaNodeProjectLibrariesRoot'
import { BidaNodeProjectLibrariesResult } from './__generated-types/BidaNodeProjectLibrariesResult'
import { BidaNodeProjectLibrary } from './__generated-types/BidaNodeProjectLibrary'

const FRAGMENTS = gql`
  fragment BidaNodeProjectLibrariesRoot on BidaNodeProject {
    id
    name
    department
    url
    dependencies {
      id
      name
      version
    }
  }
  fragment BidaNodeProjectLibrariesResult on BidaLibraryCollection {
    from
    to
    id
    projectId
    nodes {
      ...BidaNodeProjectLibrary
    }
  }
  fragment BidaNodeProjectLibrary on BidaNodeLibrary {
    id
    date
    license
    name
    version
    dependents {
      id
      name
      version
    }
  }
`
type Variables = {
  from?: Date
  to?: Date
} | null

export default createResolver<
BidaNodeProjectLibrariesRoot,
Variables,
BidaNodeProjectLibrariesResult
>(({ root, variables, cache, getCacheKey }) => {
  const fromFilter = (library: BidaNodeProjectLibrary) =>
    variables && variables.from
      ? new Date(library.date) >= (variables.from || 0)
      : true
  return {
    id: root.id,
    projectId: root.id,
    __typename: 'BidaLibraryCollection',
    from: (variables && variables.from) || null,
    to: (variables && variables.to) || null,
    nodes: root.dependencies.reduce<BidaNodeProjectLibrary[]>(
      (acc, { name: id }) => {
        const library = cache.readFragment<BidaNodeProjectLibrary>({
          fragment: FRAGMENTS,
          fragmentName: 'BidaNodeProjectLibrary',
          id: getCacheKey({ __typename: 'BidaNodeLibrary', id })
        })
        if (library && fromFilter(library)) acc.push(library)
        return acc
      },
      []
    )
  }
})
