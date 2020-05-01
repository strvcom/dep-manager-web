import * as GT from '~generated/types'
import { is } from '~app/utils/type-utils'

const Repository: GT.RepositoryResolvers = {
  /**
   * Resolves the STRV departments of a repository based on available topics.
   */
  departments: {
    fragment: `
    ... on Repository {
      repositoryTopics (first: 100) {
        nodes {
          topic {
            name
          }
        }
      }
    }
  `,
    resolve: ({ repositoryTopics }) =>
      repositoryTopics.nodes
        .filter((node) => !!node)
        .map(({ topic: { name } }) => name)
        .map((name) => name.toUpperCase())
        .filter(is(GT.BidaDepartment)),
  },
}

export { Repository }
