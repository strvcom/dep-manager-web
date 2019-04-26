import { DEPARTMENTS } from '../constants'

interface ITopicsConnection {
  nodes: Array<{
    topic: {
      name: string
    }
  }>
}

interface IRepository {
  repositoryTopics: ITopicsConnection
}

/**
 * Repository::departments
 *
 * Resolves the STRV departments of a repository based on present topics.
 */
const departments = {
  fragment: `
    ... on Repository {
      repositoryTopics (first: 10) {
        nodes {
          topic {
            name
          }
        }
      }
    }
  `,
  resolve: ({ repositoryTopics }: IRepository): string[] =>
    repositoryTopics.nodes
      .map(({ topic: { name } }) => name)
      .map(name => name.toUpperCase())
      .filter(name => DEPARTMENTS.includes(name)),
}

export const Repository = { departments }
